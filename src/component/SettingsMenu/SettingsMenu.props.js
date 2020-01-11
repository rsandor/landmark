import * as reactRedux from 'react-redux'
import {
  setContext,
  setShowClefs,
  setStaff,
  setTheme,
  toggleNotes
} from '../../reducers/settings'

function state (state) {
  const { settings } = state
  return { settings }
}

function dispatch (dispatch) {
  return {
    setContext: (context) => dispatch(setContext({ context })),
    setShowClefs: (showClefs) => dispatch(setShowClefs({ showClefs })),
    setStaff: (staff) => dispatch(setStaff({ staff })),
    setTheme: (theme) => dispatch(setTheme({ theme })),
    toggleNotes: (key) => dispatch(toggleNotes({ key })),
  }
}

export function connect (component) {
  return reactRedux.connect(state, dispatch)(component)
}
