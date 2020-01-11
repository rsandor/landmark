import * as reactRedux from 'react-redux'
import { setTheme, setBassClef, setGrandStaff, setTrebleClef, toggleNotes } from '../../reducers/settings'

function state (state) {
  const { settings } = state
  return { settings }
}

function dispatch (dispatch) {
  return {
    setTheme: (theme) => dispatch(setTheme({ theme })),
    setBassClef: () => dispatch(setBassClef()),
    setTrebleClef: () => dispatch(setTrebleClef()),
    setGrandStaff: () => dispatch(setGrandStaff()),
    toggleNotes: (key) => dispatch(toggleNotes({ key }))
  }
}

export function connect (component) {
  return reactRedux.connect(state, dispatch)(component)
}
