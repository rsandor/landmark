import { Flow } from 'vexflow'
import NoteGenerator from './NoteGenerator'
import { randomBarDurations, randomInt } from './random'

export function renderNote (clef, note, settings) {
  const { staff } = settings
  switch (staff) {
    case 'grand': return renderGrandStaffNote(note, clef, settings)
    case 'bass': return renderBassStaffNote(note, settings)
    case 'treble': return renderTrebleStaffNote(note, settings)
    default: return ''
  }
}

function svgToDataUrl (svg) {
  return `data:image/svg+xml;base64,${window.btoa(new XMLSerializer().serializeToString(svg))}`
}

function getContext (settings) {
  const div = document.createElement('div')
  const renderer = new Flow.Renderer(div, Flow.Renderer.Backends.SVG)
  const context = renderer.getContext()
  renderer.resize(325, 380)
  context.scale(1.75, 1.75)

  if (settings.theme === 'dark') {
    context.setFillStyle('#efefe9')
    context.setStrokeStyle('#efefe9')
  }

  return { context, div }
}

function renderBassStaffNote (note, settings) {
  const { theme } = settings
  const { context, div } = getContext(settings)

  const bass = new Flow.Stave(0, 40, 185)
  bass.addClef("bass")
  bass.setContext(context).draw()

  let notes = []

  if (settings.context === 'whole') {
    notes = [ new Flow.StaveNote({ clef: 'bass', keys: [note], duration: "w" })]
  } else if (settings.context === 'random-rests') {
    const durations = randomBarDurations()
    const noteIndex = randomInt(durations.length)
    notes = durations.map((duration, index) => {
      if (index === noteIndex) {
        const stem_direction = note.split('/')[1] >= 3 ? -1 : 1
        return new Flow.StaveNote({ clef: 'bass', keys: [note], duration, stem_direction })
      }
      return new Flow.StaveNote({ clef: 'bass', keys: ['d/3'], duration: duration + 'r' })
    })
  } else {
    const durations = randomBarDurations()
    const noteIndex = randomInt(durations.length)
    notes = durations.map((duration, index) => {
      if (index === noteIndex) {
        const stem_direction = note.split('/')[1] >= 3 ? -1 : 1
        const n = new Flow.StaveNote({ clef: 'bass', keys: [note], duration, stem_direction })
        if (theme === 'light') {
          n.setStyle({ strokeStyle: '#169', fillStyle: '#169' })
        } else if (theme === 'dark') {
          n.setStyle({ strokeStyle: '#49d', fillStyle: '#49d' })
        }
        return n
      } else {
        const randomNote = NoteGenerator.uniformRandomNote('bass')
        const stem_direction = randomNote.split('/')[1] >= 3 ? -1 : 1
        return new Flow.StaveNote({ clef: 'bass', keys: [randomNote], duration, stem_direction })
      }
    })
  }

  Flow.Formatter.FormatAndDraw(context, bass, notes, { auto_beam: true })
  return svgToDataUrl(div.querySelector('svg'))
}

function renderTrebleStaffNote (note, settings) {
  const { context, div } = getContext(settings)

  const treble = new Flow.Stave(0, 40, 185)
  treble.addClef("treble")
  treble.setContext(context).draw()

  const notes = [new Flow.StaveNote({ clef: 'treble', keys: [note], duration: "w" })]
  const voice = new Flow.Voice({ num_beats: 4, beat_value: 4 })
  voice.addTickables(notes)
  const formatter = new Flow.Formatter()
  formatter.joinVoices([voice]).format([voice], 150)
  voice.draw(context, treble)

  return svgToDataUrl(div.querySelector('svg'))
}

function renderGrandStaffNote (note, clef, settings) {
  const { context, div } = getContext(settings)

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

  const notes = [new Flow.StaveNote({ clef, keys: [note], duration: "w" })]
  const voice = new Flow.Voice({ num_beats: 4, beat_value: 4 })
  voice.addTickables(notes)
  const formatter = new Flow.Formatter()
  formatter.joinVoices([voice]).format([voice], 150)
  voice.draw(context, clef === 'treble' ? treble : bass)

  return svgToDataUrl(div.querySelector('svg'))
}
