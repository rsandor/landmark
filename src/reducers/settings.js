import Reducer from './Reducer'

const Settings = new Reducer('Landmark/settings', {
  theme: 'light',
  clef: {
    treble: true,
    bass: true
  },
  notes: {
    root: true,
    second: false,
    third: false
  },
  context: 'whole'
})

const themes = new Set(['light', 'dark'])
const contexts = new Set(['whole', 'random-rests', 'random-notes'])

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

const setGrandStaff = Settings.action('setGrandStaff', next => {
  next.clef = { treble: true, bass: true }
})

const setTrebleClef = Settings.action('setTrebleClef', next => {
  next.clef = { treble: true, bass: false }
})

const setBassClef = Settings.action('setBassClef', next => {
  next.clef = { treble: false, bass: true }
})

const setContext = Settings.action('setContext', (next, payload) => {
  if (contexts.has(payload.context)) {
    next.context = payload.context
  }
})

export default Settings.reducer
export {
  setTheme,
  toggleNotes,
  setGrandStaff,
  setTrebleClef,
  setBassClef,
  setContext
}
