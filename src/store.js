import { createStore } from 'redux'
import rootReducer from './reducers/root'

function loadSavedState () {
  const storedState = localStorage.getItem('reduxState')
  return storedState ? JSON.parse(storedState) : {}
}

function saveState () {
  const { settings } = store.getState()
  localStorage.setItem('reduxState', JSON.stringify({ settings }))
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
