import React from 'react'
import { addDecorator } from '@storybook/react'
import { createStore, applyMiddleware, compose } from 'redux'
// import { Provider } from 'react-redux'
// import rootReducer from './root.reducer'

const middlewares = []

const store = createStore(rootReducer,
  compose(
    applyMiddleware(
      ...middlewares
    )
  ))

/* Expose the store to the global scope (for debugging) */
window.parent.store = store
window.store = store

addDecorator(story => {
  return (
    <Provider store={store} >
      {story()}
    </Provider >
  )
})
