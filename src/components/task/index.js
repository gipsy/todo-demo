import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from 'antd'

const Task = ({
  task: { id, title, description, pin, state },
  doArchiveTask,
  doPinTask,
  className,
}) => (
  <div className={`list-item ${state} ${className}`}>
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
          <Icon
            type="star"
            theme={`${pin === 'pinned' ? 'filled' : 'outlined'}`}
          />
        </a>
      )}
    </div>
  </div>
)

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
  doArchiveTask: PropTypes.func,
  doPinTask: PropTypes.func,
  className: PropTypes.string,
}

export default styled(Task)`
  display: flex;
  flex-wrap: wrap;
  height: 3rem;
  width: 100%;
  background: transparent;
  transition: all ease-out 150ms;
`
