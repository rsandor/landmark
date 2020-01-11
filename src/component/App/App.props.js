import * as reactRedux from 'react-redux'

function state (state) {
  const { theme } = state.settings
  return { theme }
}

function dispatch (dispatch) {
  return {}
}

export function connect (component) {
  return reactRedux.connect(state, dispatch)(component)
}
