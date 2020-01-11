import store from '../store'
import { Flow } from 'vexflow'

export function renderNote (note, clef) {
  const {settings} = store.getState()
  const {bass, treble} = settings.clef
  if (bass && treble) return renderGrandStaffNote(note, clef)
  if (bass) return renderBassStaffNote(note, clef)
  if (treble) return renderTrebleStaffNote(note, clef)
  return ''
}

function renderBassStaffNote (note, clef) {
  const div = document.createElement('div')
  const renderer = new Flow.Renderer(div, Flow.Renderer.Backends.SVG)

  const context = renderer.getContext()
  renderer.resize(325, 380)
  context.scale(1.75, 1.75)

  const bass = new Flow.Stave(0, 40, 185)
  bass.addClef("bass")
  bass.setContext(context).draw()

  const notes = [
    new Flow.StaveNote({ clef: 'bass', keys: [note], duration: "w" })
  ]

  const voice = new Flow.Voice({ num_beats: 4, beat_value: 4 })
  voice.addTickables(notes)

  const formatter = new Flow.Formatter()
  formatter.joinVoices([voice]).format([voice], 150)
  voice.draw(context, bass)

  return svgToDataUrl(div.querySelector('svg'))
}

function renderTrebleStaffNote (note, clef) {
  const div = document.createElement('div')
  const renderer = new Flow.Renderer(div, Flow.Renderer.Backends.SVG)

  const context = renderer.getContext()
  renderer.resize(325, 380)
  context.scale(1.75, 1.75)

  const treble = new Flow.Stave(0, 40, 185)
  treble.addClef("treble")
  treble.setContext(context).draw()

  const notes = [
    new Flow.StaveNote({ clef: 'treble', keys: [note], duration: "w" })
  ]

  const voice = new Flow.Voice({ num_beats: 4, beat_value: 4 })
  voice.addTickables(notes)

  const formatter = new Flow.Formatter()
  formatter.joinVoices([voice]).format([voice], 150)
  voice.draw(context, treble)

  return svgToDataUrl(div.querySelector('svg'))
}

function renderGrandStaffNote (note, clef) {
  const div = document.createElement('div')
  const renderer = new Flow.Renderer(div, Flow.Renderer.Backends.SVG)

  const context = renderer.getContext()
  renderer.resize(325, 380)
  context.scale(1.75, 1.75)

  const treble = new Flow.Stave(20, 0, 160)
  treble.addClef("treble")
  treble.setContext(context).draw()

  const bass = new Flow.Stave(20, 100, 160)
  bass.addClef("bass")
  bass.setContext(context).draw()

  const connector = new Flow.StaveConnector(treble, bass)
  connector.setType('singleLeft')
  connector.setContext(context).draw()

  const brace = new Flow.StaveConnector(treble, bass)
  brace.setType('brace')
  brace.setContext(context).draw()

  const notes = [
    new Flow.StaveNote({ clef, keys: [note], duration: "w" })
  ]

  const voice = new Flow.Voice({ num_beats: 4, beat_value: 4 })
  voice.addTickables(notes)

  const formatter = new Flow.Formatter()
  formatter.joinVoices([voice]).format([voice], 150)

  voice.draw(context, clef === 'treble' ? treble : bass)

  return svgToDataUrl(div.querySelector('svg'))
}

export function svgToDataUrl (svg) {
  return `data:image/svg+xml;base64,${window.btoa(new XMLSerializer().serializeToString(svg))}`
}
