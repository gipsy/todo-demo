import { createSelector } from 'redux-bundler'

export default {
  name: 'tasks',
  getReducer: () => {
    const initialState = {
      loading: false,
      lastError: null,
      lastFetch: null,
      data: null
    }

    // this is just a normal redux reducer
    return (state = initialState, {type, payload}) => {
      if (type === 'FETCH_TASKS_START') {
        return Object.assign({}, state, {
          loading: true
        })
      }

      // In the case of an error, we store
      // a timestamp of the error so we can
      // chose to automatically retry later
      if (type === 'FETCH_TASKS_ERROR') {
        return Object.assign({}, state, {
          lastError: Date.now(),
          loading: false
        })
      }

      // we also store metadata about the fetch
      // along with the resulting data
      if (type === 'FETCH_TASKS_SUCCESS') {
        return Object.assign({}, state, {
          lastFetch: Date.now(),
          loading: false,
          lastError: null,
          data: Object.keys(payload).map(key => (payload[key]))
        })
      }

      return state
    }
  },

  // see /src/bundles/extra-args to see how apiFetch becomes
  // available here
  doFetchTasks: () => ({ dispatch, apiFetch }) => {
    dispatch({type: 'FETCH_TASKS_START'})
    apiFetch('/tasks')
      .then((payload) => {
        dispatch({type: 'FETCH_TASKS_SUCCESS', payload})
      })
      .catch(err => {
        dispatch({type: 'FETCH_TASKS_ERROR', err})
      })
  },
  
  doArchiveTask: (id) => ({ dispatch, apiFetch }) => {
    dispatch({type: 'DELETE_TASK_START'})
    apiFetch('/tasks/:id?archive')
      .then((res) => {
        dispatch({type: 'DELETE_TASK_SUCCESS', res})
      })
      .catch(error => {
        dispatch({type: 'DELETE_TASK_ERROR', error})
      })
  },

  doPinTask: (id) => ({ dispatch, apiFetch }) => {
    dispatch({type: 'PIN_TASK_START'})
    apiFetch('/tasks/:id?pin')
      .then((res) => {
        dispatch({type: 'PIN_TASK_SUCCESS', res})
      })
      .catch((err) => {
        dispatch({type: 'PIN_TASK_SUCCESS', err})
      })
  },

  doAddTask: () => ({ dispatch, apiFetch }) => {
    dispatch({type: 'ADD_TASK_START'})
    apiFetch('/tasks/new')
      .then((res) => {
        dispatch({type: 'ADD_TASK_SUCCESS', res})
      })
      .catch((err) => {
        dispatch({type: 'ADD_TASK_SUCCESS', err})
      })
  },

  // selector for the whole contents of the reducer
  // including metadata about fetches
  selectTasksRaw: state => state.tasks,

  // selector for just the actual data if we have it
  selectTasks: state => state.tasks.data,

  // we'll extract a status string here, for display, just to show
  // the type of information available about the data
  selectTasksFetchStatus: createSelector(
    'selectTasksRaw',
    (tasks) => {
      console.log('inside selectTasksFetchStatus')
      console.log(tasks)
      const { data, lastError, lastFetch, loading } = tasks

      let result = ''

      if (data) {
        result += 'Has data'
      } else {
        result += 'Does not have data'
      }

      if (loading) {
        return result + ' and is fetching currently'
      }

      if (lastError) {
        return result + ` but had an error at ${lastError} and will retry after ~30 seconds`
      }

      if (lastFetch) {
        return result + ` that was fetched at ${lastFetch} but will be updated a minute later`
      }
    }
  ),

  selectTasksActive: createSelector(
    'selectTasks',
    (tasks) => {
      if (!tasks) {
        return null
      }
      return tasks.find((task) => task.state === 'active') || null
    }
  ),

  selectTasksArchived: createSelector(
    'selectTasks',
    (tasks) => {
      if (!tasks) {
        return null
      }
      return tasks.find((task) => task.state === 'archived') || null
    }
  ),


  // here's our first "reactor"
  reactShouldFetchTasks: createSelector(
    // this is the selector we defined above, note that we can
    // just reference it by it's string name, but we could have
    // also assigned the function to a variable and passed that
    // function directly here instead.
    'selectTasksRaw',
    // this is one of the selectors that is made available by
    // one of the included bundles called 'appTime' this bundle
    // timestamps all actions and we also run an "app idle"
    // dispatch every 30 seconds if there have been no actions
    // dispatched and using requestAnimationFrame, this will
    // only happen if the tab is visible.
    // All this to say, we have a self-updating timestamp in our
    // redux state that we can use to see how long it's been.
    'selectAppTime',
    (tasks, appTime) => {
      // never trigger another fetch if we're already fetching
      if (tasks.loading) {
        return null
      }

      // for readability in this example I'm going to break out
      // and comment on the various conditions here. In reality
      // you'd likely want to write an abstraction that lets you describe
      // all this at a higher level. One such, abstraction is
      // included in the "/bundles" dir of the redux-bundler repo
      let shouldFetch = false

      // if we don't have data at all we definitely want to fetch
      if (!tasks.data) {
        shouldFetch = true
      }

      // was there an error last time we tried to fetch?
      // if it's been 15 seconds, give it another go...
      else if (tasks.lastError) {
        const timePassed = appTime - tasks.lastError
        if (timePassed > 15000) {
          shouldFetch = true
        }
      }

      // maybe our data is just stale?
      // I've made this arbitrarily short at just 1 minute
      // so you can see it working.
      // Note that we don't wipe out existing data if we have
      // it.
      else if (tasks.lastFetch) {
        const timePassed = appTime - tasks.lastfetch
        if (timePassed > 60000) {
          shouldFetch = true
        }
      }

      // here we can either return an actual action object to dispatch
      // by using `{type: 'SOME_ACTION'}` or we can just specify the
      // name of the action creator function we want to run, and optionally
      // any args we want to pass to it.
      if (shouldFetch) {
        return {actionCreator: 'doFetchTasks'}
      }
    }
  ),
  persistActions: ['FETCH_TASKS_SUCCESS']
};
