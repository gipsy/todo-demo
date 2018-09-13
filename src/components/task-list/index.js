import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-bundler-react'
import styled from 'styled-components'
import Task from '@components/task'

class TaskList extends Component {
  static propTypes = {
    tasks: PropTypes.array,
    tasksLoading: PropTypes.bool,
    doPinTask: PropTypes.func.isRequired,
    doArchiveTask: PropTypes.func.isRequired,
    doDeleteTask: PropTypes.func.isRequired,
    doFetchTasks: PropTypes.func.isRequired,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.doFetchTasks()
  }

  render() {
    const {
      tasks,
      tasksLoading,
      doPinTask,
      doArchiveTask,
      doDeleteTask,
      className,
    } = this.props

    const events = {
      doPinTask,
      doArchiveTask,
      doDeleteTask,
    }

    if (tasksLoading) {
      return (
        <>
          <div className={`list-items ${className}`}>loading</div>
        </>
      )
    }

    if (tasks.length === 0) {
      return (
        <>
          <div className={`list-items ${className}`}>empty</div>
        </>
      )
    }

    return (
      <>
        <div className={`list-items ${className}`}>
          {tasks.map((task) => (
            <Task key={task.id} task={task} {...events} />
          ))}
        </div>
      </>
    )
  }
}

export default connect(
  'doPinTask',
  'doArchiveTask',
  'doDeleteTask',
  'doFetchTasks',
  'selectTasks',
  'selectTasksLoading',
  styled(TaskList)`
    display: block;
    // background-color: ${primaryColor};
    background-color: #00A854;
  `,
)
