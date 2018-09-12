import React from 'react'
import { connect } from 'redux-bundler-react'
import styled from 'styled-components'
import { Form, Icon, Input, TextArea, Button } from 'antd'

const TaskForm = ({ doAddTask, form }) => {
  const { Item } = Form
  const { TextArea } = Input

  const { getFieldsValue, getFieldDecorator, validateFields } = form

  const handleSubmit = (e) => {
    e.preventDefault()
    validateFields((err, values) => {
      if (!err) {
        doAddTask(values)
      }
    })
  }

  return (
    <Form layout="inline" onSubmit={(e) => handleSubmit(e)}>
      <Item>
        {getFieldDecorator('title', {
          rules: [{ required: true, message: 'Please input title for task!' }],
        })(<Input placeholder="type task title" />)}
      </Item>

      <Item>
        {getFieldDecorator('description', {
          rules: [
            { required: true, message: 'Please input description for task!' },
          ],
        })(<TextArea rows={4} placeholder="task details" />)}
      </Item>
      <Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={false}
          onClick={(event) => event.stopPropagation()}>
          Submit
        </Button>
      </Item>
    </Form>
  )
}

export default connect(
  'doAddTask',
  Form.create()(styled(TaskForm)`
    background-color: grey;
  `)
)
