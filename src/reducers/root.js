import { combineReducers } from 'redux'

import settingsReducer from './settings'
import timerReducer from './timer'

const rootReducer = combineReducers({
  settings: settingsReducer,
  timer: timerReducer
})

export default rootReducer
