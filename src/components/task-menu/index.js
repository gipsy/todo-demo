import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-bundler-react'
import styled from 'styled-components'
import { Menu, Icon } from 'antd'

const TaskMenu = ({ 
  menuItem, 
  doUpdateMenu, 
  doFetchTasksByKey, 
  className,
}) => (
  <Menu
    selectedKeys={[menuItem]}
    mode="horizontal"
    onClick={(e) => doUpdateMenu(e.key)}
    onSelect={(e) => e.key === 'add' || doFetchTasksByKey(e.key)}
    className={className}
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

TaskMenu.propTypes = {
  menuItem: PropTypes.string,
  doUpdateMenu: PropTypes.func,
  doFetchTaskByKey: PropTypes.func,
  className: PropTypes.string,
}

export default connect(
  'selectMenuItem',
  'doFetchTasksByKey',
  'doUpdateMenu',
  styled(TaskMenu)`
    display: block;
  `
)
