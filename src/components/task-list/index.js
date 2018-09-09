import React from 'react';
import { connect } from 'redux-bundler-react';
import Task from '@components/task';

function TaskList({ loading, tasks, baseDataStatus }) {
  // const events = {
  //   onPinTask,
  //   onArchiveTask,
  // };

  if (loading) {
    return (
      <>
        <div className="list-items">loading</div>
      </>
    );
  }

  if (tasks.length === 0) {
    return (
      <>
        <div className="list-items">empty</div>
      </>
    );
  }

  return (
    <>
      <div className="list-items">
        {tasks.map((task) => (
          <Task key={task.id} task={task} {...events} />
        ))}
      </div>
    </>
  );
};

export default connect(
  'baseDataStatus',
  'selectTasks',
  'doFetchTasks',
  'doPinTask',
  'doArchiveTask',
  TaskList,
);
