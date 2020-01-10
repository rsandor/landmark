import * as reactRedux from 'react-redux'
import { setValue } from '../../reducers/settings'

function state (state) {
  const { settings } = state
  return { settings }
}

function dispatch (dispatch) {
  return {
    setValue: ({ key, value }) => dispatch(setValue({ key, value }))
  }
}

export function connect (component) {
  return reactRedux.connect(state, dispatch)(component)
}
