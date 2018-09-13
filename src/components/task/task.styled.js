import styled from 'styled-components'

const ListItem = styled.div`
  width: 100%;
  background-color: #fff;
`

const Title = styled.div`
  display: block;
`

const Label = styled.label`
  display: block;
  position: relative;
`

const Input = styled.input`
  display: block;
`

const Actions = styled.div`
  display: block;
`
const CheckBox = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;
`

export { ListItem, Title, Label, Input, Actions, CheckBox }
