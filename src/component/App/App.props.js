import * as reactRedux from 'react-redux'
import { clearComplete, updateCurrentTime } from '../../reducers/timer'

function state (state) {
  const { timer, settings } = state
  return { timer, settings }
}

function dispatch (dispatch) {
  return {
    clearComplete: () => dispatch(clearComplete()),
    updateCurrentTime: () => dispatch(updateCurrentTime())
  }
}

export function connect (component) {
  return reactRedux.connect(state, dispatch)(component)
}
