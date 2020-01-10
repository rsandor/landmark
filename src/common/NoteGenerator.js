import { randomElement } from './random'
import store from '../store'

const notes = {
  treble: {
    root: [ 'c/4', 'g/4', 'c/5', 'g/5', 'c/6' ],
    second: [ 'd/4', 'b/3', 'a/4', 'f/4', 'd/5', 'b/4', 'a/5', 'f/5', 'b/5', 'd/6' ],
    third: [ 'a/3', 'e/4', 'e/4', 'b/4', 'a/4', 'e/5', 'e/5', 'b/5', 'a/5', 'e/6' ]
  },
  bass: {
    root: [ 'c/4', 'f/3', 'c/3', 'f/2', 'c/2' ],
    second: [ 'b/3', 'd/4', 'e/3', 'g/3', 'b/2', 'd/3', 'e/2', 'g/2', 'b/1', 'd/2' ],
    third: [ 'a/3', 'e/4', 'd/3', 'a/3', 'a/2', 'e/3', 'd/2', 'a/2', 'a/1', 'e/2' ]
  }
}

export function sortNotes (noteArray) {
  const noteValue = { c: 0, d: 1, e: 2, f: 3, g: 4, a: 5, b: 6 }
  noteArray.sort((a, b) => {
    const [aNote, aPos] = a.split('/')
    const [bNote, bPos] = b.split('/')
    const [aNum, bNum] = [Number(aPos), Number(bPos)]
    if (aNum < bNum) return -1
    if (bNum < aNum) return 1
    const [aVal, bVal] = [noteValue[aNote], noteValue[bNote]]
    return aVal < bVal ? -1 : 1
  })
}

window.rootNotes = () => {
  const s = new Set()
  notes.treble.second.forEach(n => s.add(n))
  notes.bass.second.forEach(n => s.add(n))
  const n = Array.from(s)
  sortNotes(n)
  console.log(n.map(note => note.replace('/', '').toUpperCase()).join(' '))
}

window.secondNotes = () => {
  const s = new Set()
  notes.treble.second.forEach(n => s.add(n))
  notes.bass.second.forEach(n => s.add(n))
  const n = Array.from(s)
  sortNotes(n)
  console.log(n.map(note => note.replace('/', '').toUpperCase()).join(' '))
}

window.thirdNotes = () => {
  const s = new Set()
  notes.treble.third.forEach(n => s.add(n))
  notes.bass.third.forEach(n => s.add(n))
  const n = Array.from(s)
  sortNotes(n)
  console.log(n.map(note => note.replace('/', '').toUpperCase()).join(' '))
}


class NoteGenerator {
  get settings () {
    return store.getState().settings
  }

  randomClef () {
    const clefs = []
    if (this.settings.clef.treble) clefs.push('treble')
    if (this.settings.clef.bass) clefs.push('bass')
    return randomElement(clefs)
  }

  randomNote (clef) {
    const noteSelection = Array.from(new Set([].concat(
      this.settings.notes.root ? notes[clef].root : [],
      this.settings.notes.second ? notes[clef].second : [],
      this.settings.notes.third ? notes[clef].third : []
    )))
    return randomElement(noteSelection)
  }

  next () {
    const defaultNote = { clef: 'treble', note: 'c/4' }
    const clef = this.randomClef()
    if (!clef) return defaultNote
    const note = this.randomNote(clef)
    if (!note) return defaultNote
    return { clef, note }
  }
}

const instance = new NoteGenerator()
export default instance
