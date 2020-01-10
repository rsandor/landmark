import React from 'react'
import './Staff.scss'

import { renderNote } from '../../common/NoteRenderer'

export default function Staff ({ note, clef }) {
  const src = renderNote(note, clef)
  const alt = `Grand Staff displaying ${note} on the ${clef} clef.`
  return <div className="Staff"><img src={src} alt={alt} /></div>
}
