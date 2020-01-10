import * as reactRedux from 'react-redux'
import { toggle } from '../../reducers/settings'

function state (state) {
  return { settings: state.settings }
}

function dispatch (dispatch) {
  return {
    toggle: () => dispatch(toggle())
  }
}

export function connect (component) {
  return reactRedux.connect(state, dispatch)(component)
}
