import React from 'react'
import './Staff.scss'

import Vex from 'vexflow'

function getStaffImage (note, clef) {
  const VF = Vex.Flow

  // Create an SVG renderer and attach it to the DIV element named "boo".
  var div = document.createElement('div')
  var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  // Configure the rendering context.
  renderer.resize(220, 220);
  var context = renderer.getContext();
  // context.setFont("Arial", 10, "").setBackgroundFillStyle("#000");

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

  // Create a voice in 4/4 and add above notes
  var voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
  voice.addTickables(notes);

  // Format and justify the notes to 400 pixels.
  var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 150);

  // Render voice
  console.log(clef)
  voice.draw(context, clef === 'treble' ? treble : bass);


  const src = new XMLSerializer().serializeToString(div.querySelector('svg'))
  return `data:image/svg+xml;base64,${window.btoa(src)}`
}

export default function Staff ({ note, clef }) {
  return (
    <div id="boo" className="Staff">
      <img src={getStaffImage(note, clef)} />
    </div>
  )
}
