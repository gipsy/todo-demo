import { createSelector } from 'redux-bundler'

export default {
  name: 'tasks',
  getReducer: () => {
    const initialState = {
      loading: false,
      lastError: null,
      lastFetch: null,
      data: null,
    }

    // this is just a normal redux reducer
    return (state = initialState, { type, payload }) => {
      if (type === 'FETCH_TASKS_START') {
        return Object.assign({}, state, {
          loading: true,
        })
      }

      // In the case of an error, we store
      // a timestamp of the error so we can
      // chose to automatically retry later
      if (type === 'FETCH_TASKS_ERROR') {
        return Object.assign({}, state, {
          lastError: Date.now(),
          loading: false,
        })
      }

      // we also store metadata about the fetch
      // along with the resulting data
      if (type === 'FETCH_TASKS_SUCCESS') {
        return Object.assign({}, state, {
          lastFetch: Date.now(),
          loading: false,
          lastError: null,
          data: payload,
        })
      }

      if (type === 'FETCH_ACTIVE_TASKS_START') {
        return Object.assign({}, state, {
          loading: true,
        })
      }

      if (type === 'FETCH_ACTIVE_TASKS_ERROR') {
        return Object.assign({}, state, {
          lastError: Date.now(),
          loading: false,
        })
      }

      if (type === 'FETCH_ACTIVE_TASKS_SUCCESS') {
        return Object.assign({}, state, {
          lastFetch: Date.now(),
          loading: false,
          lastError: null,
          data: payload.filter((task) => task.state === 'active'),
        })
      }

      if (type === 'FETCH_ARCHIVED_TASKS_START') {
        return Object.assign({}, state, {
          loading: true,
        })
      }

      if (type === 'FETCH_ARCHIVED_TASKS_ERROR') {
        return Object.assign({}, state, {
          lastError: Date.now(),
          loading: false,
        })
      }

      if (type === 'FETCH_ARCHIVED_TASKS_SUCCESS') {
        return Object.assign({}, state, {
          lastFetch: Date.now(),
          loading: false,
          lastError: null,
          data: payload.filter((task) => task.state === 'archived'),
        })
      }

      if (type === 'PIN_TASK_START') {
        return Object.assign({}, state, {
          loading: true,
        })
      }

      if (type === 'PIN_TASK_ERROR') {
        return Object.assign({}, state, {
          lastError: Date.now(),
          loading: false,
        })
      }

      if (type === 'PIN_TASK_SUCCESS') {
        return Object.assign({}, state, {
          lastFetch: Date.now(),
          loading: false,
          lastError: null,
          data: state.data.map((task) => {
            if (task.id !== payload.id) {
              return task
            }

            return {
              ...task,
              ...payload,
            }
          }),
        })
      }

      if (type === 'ARCHIVE_TASK_START') {
        return Object.assign({}, state, {
          loading: true,
        })
      }

      if (type === 'ARCHIVE_TASK_ERROR') {
        return Object.assign({}, state, {
          lastError: Date.now(),
          loading: false,
        })
      }

      if (type === 'ARCHIVE_TASK_SUCCESS') {
        return Object.assign({}, state, {
          lastFetch: Date.now(),
          loading: false,
          lastError: null,
          // data: payload.filter((task) => task.state === 'archived'),
          data: payload,
        })
      }

      return state
    }
  },

  // see /src/bundles/extra-args to see how
  // apiGet/apiUpdate/apiCreate becomes
  // available here
  doFetchTasks: () => ({ dispatch, apiRead }) => {
    dispatch({ type: 'FETCH_TASKS_START' })
    apiRead('/tasks')
      .then((payload) => {
        dispatch({
          type: 'FETCH_TASKS_SUCCESS',
          payload,
        })
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_TASKS_ERROR', err })
      })
  },

  doFetchTasksByKey: (key) => ({ dispatch, apiRead }) => {
    const KEY = key === 'todo' ? 'ACTIVE' : 'ARCHIVED'
    dispatch({ type: 'FETCH_TASKS_START' })
    apiRead('/tasks').then((payload) => {
      dispatch({
        type: `FETCH_${KEY}_TASKS_SUCCESS`,
        payload,
      })
    })
  },

  doArchiveTask: (id) => ({ dispatch, apiUpdate }) => {
    dispatch({ type: 'ARCHIVE_TASK_START' })
    apiUpdate('/tasks', id, { state: 'archived' })
      .then((payload) => {
        dispatch({
          type: 'ARCHIVE_TASK_SUCCESS',
          payload,
        })
      })
      .catch((err) => {
        dispatch({ type: 'ARCHIVE_TASK_ERROR', err })
      })
  },

  doPinTask: (id) => ({ dispatch, apiUpdate, getState }) => {
    dispatch({ type: 'PIN_TASK_START' })
    const pin =
      getState().tasks.data.find((task) => task.id === id).pin === 'pinned'
        ? { pin: 'default' }
        : { pin: 'pinned' }
    apiUpdate('/tasks', id, pin)
      .then((payload) => {
        dispatch({
          type: 'PIN_TASK_SUCCESS',
          payload,
        })
      })
      .catch((err) => {
        dispatch({ type: 'PIN_TASK_ERROR', err })
      })
  },

  doAddTask: (data) => ({ dispatch, apiCreate }) => {
    dispatch({ type: 'ADD_TASK_START' })
    apiCreate('/tasks', data)
      .then((payload) => {
        dispatch({
          type: 'ADD_TASK_SUCCESS',
          payload,
        })
      })
      .catch((err) => {
        dispatch({ type: 'ADD_TASK_ERROR', err })
      })
  },

  doDeleteTask: (id) => ({ dispatch, apiDelete }) => {
    dispatch({ type: 'DELETE_TASK_START' })
    apiDelete('/tasks/', id)
      .then((payload) => {
        dispatch({
          type: 'DELETE_TASK_SUCCESS',
          payload,
        })
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_TASK_ERROR', err })
      })
  },

  // selector for the whole contents of the reducer
  // including metadata about fetches
  selectTasksRaw: (state) => state.tasks,

  // selector for just the actual data if we have it
  selectTasks: (state) => state.tasks.data,

  // we'll extract a status string here, for display, just to show
  // the type of information available about the data
  selectTasksFetchStatus: createSelector('selectTasksRaw', (tasks) => {
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
      return (
        result +
        ` but had an error at ${lastError} and will retry after ~30 seconds`
      )
    }

    if (lastFetch) {
      return (
        result +
        ` that was fetched at ${lastFetch} but will be updated a minute later`
      )
    }
  }),

  selectTasksActive: createSelector('selectTasks', (tasks) => {
    if (!tasks) {
      return null
    }
    return tasks.filter((task) => task.state === 'active') || null
  }),

  selectTasksArchived: createSelector('selectTasks', (tasks) => {
    if (!tasks) {
      return null
    }
    return tasks.filter((task) => task.state === 'archived') || null
  }),

  selectTasksLoading: (state) => state.tasks.loading,

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
        return { actionCreator: 'doFetchTasks' }
      }
    },
  ),
  persistActions: ['FETCH_TASKS_SUCCESS'],
}
