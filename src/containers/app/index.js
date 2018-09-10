import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { connect } from 'redux-bundler-react'

import Home from '@screens/home'
import TaskListPage from '@screens/task-list'

const AppRoot = () => {
  return (
    <Router>
      <>
        <Route path="/" exact component={Home} />
        <Route path="/tasks" component={TaskListPage} />
      </>
    </Router>
  )
}

export default hot(module)(AppRoot)
