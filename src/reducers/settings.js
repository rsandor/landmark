import isBoolean from 'lodash/isBoolean'
import Reducer from './Reducer'

const Settings = new Reducer('Landmark/settings', {
  context: 'whole',
  notes: {
    root: true,
    second: false,
    third: false
  },
  showClefs: true,
  staff: 'grand',
  theme: 'light',
})

const contexts = new Set(['whole', 'random-rests', 'random-notes'])
const staffs = new Set(['grand', 'treble', 'bass'])
const themes = new Set(['light', 'dark'])

const setContext = Settings.action('setContext', (next, payload) => {
  if (contexts.has(payload.context)) {
    next.context = payload.context
  }
})

const setShowClefs = Settings.action('setShowClefs', (next, payload) => {
  if (isBoolean(payload.showClefs)) {
    next.showClefs = payload.showClefs
  }
})

const setStaff = Settings.action('setStaff', (next, payload) => {
  if (staffs.has(payload.staff)) {
    next.staff = payload.staff
  }
})

const setTheme = Settings.action('setTheme', (next, payload) => {
  const {theme} = payload
  if (themes.has(theme)) {
    next.theme = payload.theme
  }
})

const toggleNotes = Settings.action('toggleNotes', (next, payload) => {
  const {root, second, third} = next.notes
  switch (payload.key) {
    case 'root':
      next.notes.root = !root
      return
    case 'second':
      next.notes.second = !second
      return
    case 'third':
      next.notes.third = !third
      return
    default:
  }
})

export default Settings.reducer
export { setContext, setShowClefs, setStaff, setTheme, toggleNotes }
