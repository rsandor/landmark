import Vex from 'vexflow'

export function renderNote (note, clef) {
  const VF = Vex.Flow
  const div = document.createElement('div')
  const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  renderer.resize(220, 220);
  const context = renderer.getContext();

  const treble = new VF.Stave(20, 0, 190)
  treble.addClef("treble")
  treble.setContext(context).draw()

  const bass = new VF.Stave(20, 100, 190)
  bass.addClef("bass")
  bass.setContext(context).draw()

  const connector = new VF.StaveConnector(treble, bass)
  connector.setType('singleLeft')
  connector.setContext(context).draw()

  const brace = new VF.StaveConnector(treble, bass)
  brace.setType('brace')
  brace.setContext(context).draw()

  const notes = [
    new VF.StaveNote({ clef, keys: [note], duration: "w" })
  ]

  const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
  voice.addTickables(notes)

  const formatter = new VF.Formatter()
  formatter.joinVoices([voice]).format([voice], 150)

  voice.draw(context, clef === 'treble' ? treble : bass)

  return svgToDataUrl(div.querySelector('svg'))
}

export function svgToDataUrl (svg) {
  return `data:image/svg+xml;base64,${window.btoa(new XMLSerializer().serializeToString(svg))}`
}
