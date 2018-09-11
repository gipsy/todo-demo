import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-bundler-react'
import { Menu, Icon } from 'antd'

class TaskMenu extends Component {
  static propTypes = {
    doAddTask: PropTypes.func.isRequired,
    doFetchTasks: PropTypes.func.isRequired,
    doFetchActiveTasks: PropTypes.func.isRequired,
    doFetchArchivedTasks: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      currentMenu: 'todo',
    }
  }

  handleSelectMenu = (e) => {
    switch (e.key) {
      case 'todo':
        return this.setState({ currentMenu: e.key })
      case 'done':
        return this.setState({ currentMenu: e.key })
      case 'add':
        return this.setState({ currentMenu: e.key })
    }
  }

  handleUpdateTaskList = (e) => {
    switch (e.key) {
      case 'todo':
        return this.props.doFetchActiveTasks()
      case 'done':
        return this.props.doFetchArchivedTasks()
      case 'add':
        this.props.doAddTask({
          title: 'test',
          description: 'test',
          state: 'active',
        })
        return this.props.doFetchTasks()
    }
  }

  render() {
    const { currentMenu } = this.state

    return (
      <>
        <Menu
          selectedKeys={[currentMenu]}
          mode="horizontal"
          onClick={(e) => this.handleSelectMenu(e)}
          onSelect={(e) => this.handleUpdateTaskList(e)}
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
      </>
    )
  }
}

export default connect(
  'doAddTask',
  'doFetchTasks',
  'doFetchActiveTasks',
  'doFetchArchivedTasks',
  TaskMenu,
)
