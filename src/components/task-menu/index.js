import React from 'react'
import { connect } from 'redux-bundler-react'
import { Menu, Icon } from 'antd'

function TaskMenu({
  doAddTask,
  tasksActive,
  tasksArchived,
}) {
  console.log('show tasksArchived')
  console.log(tasksArchived)
  console.log('show tasksActive')
  console.log(tasksActive)

  const handleSelect = (item) => {
    switch (item.key) {
      case 'todo':
        return tasksActive
      case 'done':
        return tasksArchived
      case 'add':
        return doAddTask()
    }
  }

  let {filter} = 'todo'
  // let selectedKey = (filter === SHOW_TODO ? 'todo' : 'done')
  let selectedKey = ('todo')
  return (
    <>
      <Menu selectedKeys={[selectedKey]} mode="horizontal" onSelect={handleSelect}>
        <Menu.Item key="todo">
          <Icon type="tags" />Todo
        </Menu.Item>

        <Menu.Item key="done">
          <Icon type="check" />Done
        </Menu.Item>

        <Menu.Item key="add" onClick={() => 1}>
          <Icon type="plus-circle-o" />Add
        </Menu.Item>
      </Menu>
    </>
  )
}

export default connect(
  'doAddTask',
  'selectTasksActive',
  'selectTasksArchived',
  TaskMenu
)
