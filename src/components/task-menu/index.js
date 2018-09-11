import React from 'react'
import { connect } from 'redux-bundler-react'
import { Menu, Icon } from 'antd'

const TaskMenu = ({ doUpdateMenu, doFetchTasksByKey, menuItem }) => (
  <Menu
    selectedKeys={[menuItem]}
    mode="horizontal"
    onClick={(e) => doUpdateMenu(e.key)}
    onSelect={(e) => e.key === 'add' || doFetchTasksByKey(e.key)}
  >
    <Menu.Item key="todo">
      <Icon type="tags" />
      Todo
    </Menu.Item>

    <Menu.Item key="done">
      <Icon type="check" />
      Done
    </Menu.Item>

    <Menu.Item key="add" onClick={() => 1}>
      <Icon type="plus-circle-o" />
      Add
    </Menu.Item>
  </Menu>
)

export default connect(
  'doFetchTasksByKey',
  'doUpdateMenu',
  'selectMenuItem',
  TaskMenu,
)
