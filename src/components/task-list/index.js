import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-bundler-react'
import Task from '@components/task'

class TaskList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.doFetchTasks()
  }

  render() {
    const { tasks, tasksLoading, doPinTask, doArchiveTask } = this.props

    const events = {
      doPinTask,
      doArchiveTask,
    }

    if (tasksLoading) {
      return (
        <>
          <div className="list-items">loading</div>
        </>
      )
    }

    if (tasks.length === 0) {
      return (
        <>
          <div className="list-items">empty</div>
        </>
      )
    }

    return (
      <>
        <div className="list-items">
          {tasks.map((task) => (
            <Task key={task.id} task={task} {...events} />
          ))}
        </div>
      </>
    )
  }
}

TaskList.propTypes = {
  doPinTask: PropTypes.func.isRequired,
  doArchiveTask: PropTypes.func.isRequired,
  doFetchTasks: PropTypes.func.isRequired,
  tasks: PropTypes.array,
  tasksLoading: PropTypes.bool,
}

export default connect(
  'doPinTask',
  'doArchiveTask',
  'doFetchTasks',
  'selectTasks',
  'selectTasksLoading',
  TaskList,
)
