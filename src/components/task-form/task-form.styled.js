import styled from 'styled-components'
import {
  Form as AntForm,
  Icon as AntIcon,
  Input as AntInput,
  Button as AntButton,
} from 'antd'

const Form = styled(AntForm)`
  display: block;
`

const Item = styled(AntForm.Item)`
  display: block;
  width: 100%;
  background-color: white;
`

const Input = styled(AntInput)`
  display: block;
`

const Icon = styled(AntIcon)`
  display: block;
`

const TextArea = styled(Input.TextArea)`
  display: block;
`

const Button = styled(AntButton)`
  display: block;
`

export { Form, Item, Input, Icon, TextArea, Button }
