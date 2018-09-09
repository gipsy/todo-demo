const ARCHIVE_TASK = 'tasks/ARCHIVE_TASK';
const FETCH_TASKS_START = 'tasks/FETCH_TASKS_START';
const FETCH_TASKS_SUCCESS = 'tasks/FETCH_TASKS_SUCCESS';
const PIN_TASK = 'tasks/PIN_TASK';
import { createSelector } from 'redux-bundler';

const initialState = {
  tasks: [],
  loading: false
};

export default {
  name: 'tasks',

  getReducer: () => {
    return (state = initialState, action) => {
      switch (action.type) {
        case FETCH_TASKS_START:
          return {
            ...state,
            loading: true
          };
        case FETCH_TASKS_SUCCESS:
          return {
            ...state,
            loading: false,
            tasks: state.tasks.map(
              task => (console.log(task))
            )
          }
        case ARCHIVE_TASK:
          return {
            ...state,
            tasks: state.tasks.map(
              task => (task.id === action.id 
              ? { ...task, state: ARCHIVE_TASK } 
              : task)
            )
          };
        case PIN_TASK:
          return {
            ...state,
            tasks: state.tasks.map(
              task => (task.id === action.id
              ? { ...task, state: PIN_TASK }
              : task)
            )
          };

        default:
          return state;
      }
    };
  },

  doFetchTasks: () => ({ dispatch, apiFetch }) => {
    dispatch({FETCH_TASKS_START});
    apiFetch('/tasks').then(payload => {
      dispatch({ type: 'FETCH_PEOPLE_SUCCESS', payload });
    });
  },

  doHandleArchiveTask: (id) => ({ dispatch }) => {
    dispatch(archiveTask(id))
  },

  doHandlePinTask: (id) => ({ dispatch }) => {
    dispatch(pinTask(id))
  },

  selectTasks: state => state.tasks,
};
