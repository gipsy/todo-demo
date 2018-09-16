import React from 'react'
import { storiesOf } from '@storybook/react'
import { Provider } from 'redux-bundler-react'

import TaskList from '@components/task-list'
import { task, actions } from '@components/task/task.stories'

export const defaultTasks = [
  { ...task, id: 1, title: 'Task 1', description: 'Task Description 1' },
  { ...task, id: 2, title: 'Task 2', description: 'Task Description 2' },
  { ...task, id: 3, title: 'Task 3', description: 'Task Description 3' },
  { ...task, id: 4, title: 'Task 4', description: 'Task Description 4' },
  { ...task, id: 5, title: 'Task 5', description: 'Task Description 5' },
  { ...task, id: 6, title: 'Task 6', description: 'Task Description 6' },
]

export const withPinnedTasks = [
  ...defaultTasks.slice(0, 5),
  { id: '6', title: 'Task 6 (pinned)', description: 'Task Description 6', state: 'default', pin: 'pinned' },
]

storiesOf('TaskList', module)
  .addDecorator((getStory) => <Provider store={store}>{getStory()}</Provider>)
  .addDecorator((story) => <div style={{ padding: '3rem' }}>{story()}</div>)
  .add('default', () => <TaskList tasks={defaultTasks} {...actions} />)
  .add('withPinnedTasks', () => (
    <TaskList tasks={withPinnedTasks} {...actions} />
  ))
  .add('loading', () => <TaskList loading tasks={[]} {...actions} />)
  .add('empty', () => <TaskList tasks={[]} {...actions} />)
