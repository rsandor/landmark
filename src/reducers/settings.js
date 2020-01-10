import Reducer from './Reducer'

const Settings = new Reducer('NesStudio/sprite', {
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

const setValue = Settings.action('setValue', (next, payload) => {
  const { key, value } = payload
  const [major, minor] = key.split('.')
  if (!(major in next)) return
  if (!(minor in next[major])) return
  next[major][minor] = value
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
export { setValue, toggleNotes, setGrandStaff, setTrebleClef, setBassClef }
