import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { connect } from 'redux-bundler-react'

import { ThemeProvider } from 'styled-components'
import createTheme from '@components/theme/create-theme'
import Home from '@screens/home'
import TaskListPage from '@screens/task-list'

import 'antd/dist/antd.css'

const AppRoot = () => {
  return (
    <ThemeProvider theme={{ primaryColor: '#00A854' }}>
      <Router>
        <>
          <Route path="/" exact component={Home} />
          <Route path="/tasks" component={TaskListPage} />
        </>
      </Router>
    </ThemeProvider>
  )
}

export default hot(module)(AppRoot)
