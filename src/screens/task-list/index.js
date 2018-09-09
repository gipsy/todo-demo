import React from 'react'
import { connect } from 'redux-bundler-react'
import TaskMenu from '@components/task-menu'
import TaskList from '@components/task-list'

const TaskListPage = ({ doFetchTasks }) => (
  <div>
    <h1>Task List</h1>
    <div>
      <button onClick={() => doFetchTasks()}>Fetch Tasks</button>
    </div>
    <TaskMenu />
    <TaskList />
  </div>
)

export default connect(
  'doFetchTasks',
  TaskListPage
)
