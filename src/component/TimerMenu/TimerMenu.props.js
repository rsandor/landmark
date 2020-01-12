import * as reactRedux from 'react-redux'

import { setDuration, setState } from '../../reducers/timer'

function state (state) {
  const { timer } = state
  return { timer }
}

function dispatch (dispatch) {
  return {
    setDuration: (duration) => dispatch(setDuration({ duration })),
    setState: (state) => dispatch(setState({ state })),
  }
}

export function connect (component) {
  return reactRedux.connect(state, dispatch)(component)
}
