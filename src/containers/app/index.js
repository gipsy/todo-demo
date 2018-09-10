import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { connect } from 'redux-bundler-react'

import Home from '@screens/home'
// import SignIn from '@screens/sign-in'
// import Private from '@screens/private'
import TaskListPage from '@screens/task-list'

const AppRoot = ({ signedIn, signedInPending }) => {
  const requireAuth = (Component) => (signedIn ? Component : SignIn)
  if (signedInPending) {
    return null
  }
  return (
    <Router>
      <>
        <Route path="/" exact component={Home} />
        <Route path="/tasks" component={TaskListPage} />
        {/* <Route path="/private" component={requireAuth(Private)} /> */}
        {/* <Route path="/sign-in" component={SignIn} /> */}
        {/* <Route path="/tasks" component={TaskListPage} /> */}
      </>
    </Router>
  )
}

export default hot(module)(
  connect(
    'selectSignedIn',
    'selectSignedInPending',
    AppRoot,
  ),
)
