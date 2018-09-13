import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from 'antd'

import { ListItem, Title, Label, Input, Actions, CheckBox } from './task.styled'

const Task = ({
  task: { id, title, description, pin, state },
  doArchiveTask,
  doPinTask,
  doDeleteTask,
  className,
}) => (
  <ListItem className={`${state} ${className}`}>
    <Label className="checkbox">
      <input
        type="checkbox"
        defaultChecked={state === 'archived'}
        disabled={true}
        name="checked"
      />
      <CheckBox className="checkbox-custom" onClick={() => doArchiveTask(id)} />
    </Label>
    <Title className="title">
      <input
        type="text"
        value={title}
        readOnly={true}
        placeholder="Input title"
      />
    </Title>
    <Actions className="actions" onClick={(event) => event.stopPropagation()}>
      {state !== 'archived' && (
        <a onClick={() => doPinTask(id)}>
          <Icon
            type="star"
            theme={`${pin === 'pinned' ? 'filled' : 'outlined'}`}
          />
        </a>
      )}
      <a onClick={() => doDeleteTask(id)}>
        <Icon type="delete" />
      </a>
    </Actions>
  </ListItem>
)

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }),
  doArchiveTask: PropTypes.func,
  doDeleteTask: PropTypes.func,
  doPinTask: PropTypes.func,
  className: PropTypes.string,
}

export default styled(Task)`
  display: flex;
  flex-wrap: wrap;
  height: 3rem;
  width: 100%;
  transition: all ease-out 150ms;
`
