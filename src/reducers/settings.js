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

export default Settings.reducer
export { setValue }
