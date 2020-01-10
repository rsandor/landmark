import Reducer from './Reducer'

const Settings = new Reducer('NesStudio/sprite', {
  foo: 'bar'
})

const toggle = Settings.action('toggle', (next, payload, action) => {
  next.foo = next.foo === 'bar' ? 'baz' : 'bar'
})

export default Settings.reducer
export { toggle }
