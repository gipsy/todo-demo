import { createRouteBundle } from 'redux-bundler'
import HomePage from '@screens/home'
import TaskDetailPage from '@screens/task-detail'
import TaskListPage from '@screens/task-list'

export default createRouteBundle({
  '/': 'home',
  '/tasks': 'tasks',
  '/tasks/:id': 'taskDetail'
})
