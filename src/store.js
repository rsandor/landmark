import { createStore } from 'redux'
import rootReducer from './reducers/root'

const DEVELOPMENT = true

function loadSavedState () {
  const storedState = localStorage.getItem('reduxState')
  return storedState ? JSON.parse(storedState) : {}
}

function saveState () {
  return DEVELOPMENT ? saveStateDev() : saveStateProd()
}

function saveStateProd () {
  const state = store.getState()
  localStorage.setItem('reduxState', JSON.stringify({ }))
}

function saveStateDev () {
  const state = store.getState()
  localStorage.setItem('reduxState', JSON.stringify({ }))
}

const store = createStore(rootReducer, loadSavedState())
store.subscribe(saveState)

window.store = {
  reset () {
    localStorage.removeItem('reduxState')
    window.location.reload()
  },
  get state () {
    return store.getState()
  },
  dispatch (action) {
    return store.dispatch(action)
  }
}

export default store
