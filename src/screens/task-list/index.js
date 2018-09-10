import React from 'react'
import TaskMenu from '@components/task-menu'
import TaskList from '@components/task-list'

const TaskListPage = () => (
  <div>
    <h1>Task List</h1>
    <TaskMenu />
    <TaskList />
  </div>
)

export default TaskListPage
