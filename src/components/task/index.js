import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

Task.propTypes = {
  task: PropTypes.object.isRequired,
  doArchiveTask: PropTypes.func.isRequired,
  doPinTask: PropTypes.func.isRequired,
}

function Task({
  task: { id, title, description, state },
  doArchiveTask,
  doPinTask,
}) {
  return (
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
}

export default Task
