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
  }
})

const themes = new Set(['light', 'dark'])

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

export default Settings.reducer
export { setTheme, toggleNotes, setGrandStaff, setTrebleClef, setBassClef }
