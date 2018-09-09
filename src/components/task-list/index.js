import React from 'react'
import { connect } from 'redux-bundler-react'
import Task from '@components/task'

function TaskList({ 
  doPinTask,
  doArchiveTask,
  tasks,
  tasksActive,
  tasksArchived,
  loading,
}) {

  console.log('show loading')
  console.log(loading)

  const events = {
    doPinTask,
    doArchiveTask,
  }

  if (loading) {
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

export default connect(
  'doPinTask',
  'doArchiveTask',
  'selectTasks',
  'selectTasksActive',
  'selectTasksArchived',
  TaskList
)
