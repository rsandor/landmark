import * as reactRedux from 'react-redux'

function state (state) {
  const { settings } = state
  return { settings }
}

function dispatch (dispatch) {
  return {}
}

export function connect (component) {
  return reactRedux.connect(state, dispatch)(component)
}
