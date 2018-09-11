import { createSelector } from 'redux-bundler'

export default {
  name: 'menu',
  getReducer: () => {
    const initialState = {
      currentMenu: 'todo',
    }

    return (state = initialState, { type, item }) => {
      if (type === 'CHANGE_MENU') {
        return Object.assign({}, state, {
          currentMenu: item,
        })
      }

      return state
    }
  },

  doUpdateMenu: (item) => ({ dispatch }) => {
    dispatch({ type: 'CHANGE_MENU', item })
  },

  selectMenuItem: (state) => state.menu.currentMenu,
}
