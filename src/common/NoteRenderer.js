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

function renderBassStaffNote (note, settings) {
  const { context, div } = getContext(settings)
  const notes = getNotes(note, 'bass', settings)
  const bass = new Flow.Stave(0, 40, 185)
  if (settings.showClefs) bass.addClef('bass')
  bass.setContext(context).draw()
  Flow.Formatter.FormatAndDraw(context, bass, notes, { auto_beam: true })
  return svgToDataUrl(div.querySelector('svg'))
}

function renderTrebleStaffNote (note, settings) {
  const { context, div } = getContext(settings)
  const notes = getNotes(note, 'treble', settings)
  const treble = new Flow.Stave(0, 40, 185)
  if (settings.showClefs) treble.addClef('treble')
  treble.setContext(context).draw()
  Flow.Formatter.FormatAndDraw(context, treble, notes, { auto_beam: true })
  return svgToDataUrl(div.querySelector('svg'))
}

function renderGrandStaffNote (note, clef, settings) {
  const { context, div } = getContext(settings)

  const treble = new Flow.Stave(20, 0, 160)
  if (settings.showClefs) treble.addClef('treble')
  treble.setContext(context).draw()

  const bass = new Flow.Stave(20, 100, 160)
  if (settings.showClefs) bass.addClef('bass')
  bass.setContext(context).draw()

  const connector = new Flow.StaveConnector(treble, bass)
  connector.setType('singleLeft')
  connector.setContext(context).draw()

  if (settings.showClefs) {
    const brace = new Flow.StaveConnector(treble, bass)
    brace.setType('brace')
    brace.setContext(context).draw()
  }

  const notes = getNotes(note, clef, settings)
  const altNotes = getOtherStaffNotes(clef === 'bass' ? 'treble' : 'bass', settings)
  const mainClef = (clef === 'bass') ? bass : treble
  const altClef = (clef === 'bass') ? treble : bass
  Flow.Formatter.FormatAndDraw(context, mainClef, notes, { auto_beam: true })
  Flow.Formatter.FormatAndDraw(context, altClef, altNotes, { auto_beam: true })

  return svgToDataUrl(div.querySelector('svg'))
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

function getNotes (note, clef, settings) {
  const { theme } = settings
  let notes = []
  const restNote = clef === 'bass' ? 'd/3' : 'b/4'

  const getStemDirection = n => {
    const value = n.split('/')[1]
    if (clef === 'bass') return value >= 3 ? -1 : 1
    if (clef === 'treble') return value >= 5 ? -1 : 1
  }

  if (settings.context === 'whole') {
    notes = [ new Flow.StaveNote({ clef, keys: [note], duration: 'w' })]
  } else if (settings.context === 'random-rests') {
    const durations = randomBarDurations()
    const noteIndex = randomInt(durations.length)
    notes = durations.map((duration, index) => {
      if (index === noteIndex) {
        let stem_direction = getStemDirection(note)
        return new Flow.StaveNote({ clef, keys: [note], duration, stem_direction })
      }
      return new Flow.StaveNote({ clef, keys: [restNote], duration: duration + 'r' })
    })
  } else {
    const durations = randomBarDurations()
    const noteIndex = randomInt(durations.length)
    notes = durations.map((duration, index) => {
      if (index === noteIndex) {
        const stem_direction = getStemDirection(note)
        const n = new Flow.StaveNote({ clef, keys: [note], duration, stem_direction })
        if (theme === 'light') {
          n.setStyle({ strokeStyle: '#169', fillStyle: '#169' })
        } else if (theme === 'dark') {
          n.setStyle({ strokeStyle: '#49d', fillStyle: '#49d' })
        }
        return n
      } else {
        const randomNote = NoteGenerator.uniformRandomNote(clef)
        const stem_direction = getStemDirection(randomNote)
        return new Flow.StaveNote({ clef, keys: [randomNote], duration, stem_direction })
      }
    })
  }

  return notes
}

function getOtherStaffNotes (clef, settings) {
  const restNote = clef === 'bass' ? 'd/3' : 'b/4'

  const getStemDirection = n => {
    const value = n.split('/')[1]
    if (clef === 'bass') return value >= 3 ? -1 : 1
    if (clef === 'treble') return value >= 5 ? -1 : 1
  }

  if (settings.context === 'random-rests') {
    return [new Flow.StaveNote({ clef, keys: [restNote], duration: 'wr' })]
  }

  if (settings.context === 'random-notes') {
    const durations = randomBarDurations()
    return durations.map((duration, index) => {
      const randomNote = NoteGenerator.uniformRandomNote(clef)
      const stem_direction = getStemDirection(randomNote)
      return new Flow.StaveNote({ clef, keys: [randomNote], duration, stem_direction })
    })
  }

  return []
}
