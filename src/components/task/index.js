import React from 'react'
import { Icon } from 'antd'

const Task = ({
  task: { id, title, description, state },
  doArchiveTask,
  doPinTask,
}) => (
  <div className={`list-item ${state}`}>
    <label className="checkbox">
      <input
        type="checkbox"
        defaultChecked={state === 'archived'}
        disabled={true}
        name="checked"
      />
      <span className="checkbox-custom" onClick={() => doArchiveTask(id)} />
    </label>
    <div className="title">
      <input
        type="text"
        value={title}
        readOnly={true}
        placeholder="Input title"
      />
    </div>
    <div className="actions" onClick={(event) => event.stopPropagation()}>
      {state !== 'archived' && (
        <a onClick={() => doPinTask(id)}>
          <Icon type="star" theme="filled" />
        </a>
      )}
    </div>
  </div>
)

export default Task
