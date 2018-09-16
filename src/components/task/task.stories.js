import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Task from '@components/task'

export const task = {
  id: 1,
  title: 'Test Task',
  description: 'Test Description',
  state: 'active',
  pin: 'default',
}

export const actions = {
  doPinTask: action('doPinTask'),
  doArchiveTask: action('doArchiveTask'),
}

storiesOf('Task', module)
  .add('default', () => <Task task={task} {...actions} />)
  .add('pinned', () => (
    <Task task={{ ...task, pin: 'pinned' }} {...actions} />
  ))
  .add('archived', () => (
    <Task task={{ ...task, state: 'archived' }} {...actions} />
  ))
