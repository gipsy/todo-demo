import React from 'react'
import { connect } from 'redux-bundler-react'
import TaskMenu from '@components/task-menu'
import TaskForm from '@components/task-form'
import TaskList from '@components/task-list'

const TaskListPage = ({ menuItem }) => (
  <>
    <h1>Task List</h1>
    <TaskMenu />
    {menuItem === 'add' ? <TaskForm /> : <TaskList />}
  </>
)

export default connect(
  'selectMenuItem',
  TaskListPage,
)
