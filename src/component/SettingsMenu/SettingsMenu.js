import React from 'react'
import './SettingsMenu.scss'

import { connect } from './SettingsMenu.props'

function ConnectedSettingsMenu ({
  settings,
  setBassClef,
  setGrandStaff,
  setTrebleClef,
  toggleNotes,
  setTheme,
  setContext,
  visible
}) {
  if (!visible) return null

  const { clef, notes, theme } = settings

  const isGrandStaff = clef.treble && clef.bass
  const isTrebleClef = clef.treble && !clef.bass
  const isBassClef = clef.bass && !clef.treble

  return (
    <div className="SettingsMenu">
      <h2>Settings</h2>

      <div className="section">
        <h3>Staff</h3>
        <div className="selector">
          <div onClick={setGrandStaff} className={`option${isGrandStaff ? ' selected' : ''}`}>Grand (Piano)</div>
          <div onClick={setTrebleClef} className={`option${isTrebleClef ? ' selected' : ''}`}>Treble (G)</div>
          <div onClick={setBassClef} className={`option${isBassClef ? ' selected' : ''}`}>Bass (F)</div>
        </div>
      </div>

      <div className="section">
        <h3>Notes</h3>
        <div className="selector">
          <div onClick={() => toggleNotes('root')} className={`option${notes.root ? ' selected' : ''}`}>
            Root
          </div>
          <div onClick={() => toggleNotes('second')} className={`option${notes.second ? ' selected' : ''}`}>
            2<sup><small>nd</small></sup> &amp; 7<sup><small>th</small></sup>
          </div>
          <div onClick={() => toggleNotes('third')} className={`option${notes.third ? ' selected' : ''}`}>
            3<sup><small>rd</small></sup> &amp; 6<sup><small>th</small></sup>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Theme</h3>
        <div className="selector">
          <div onClick={() => setTheme('light')} className={`option${theme === 'light' ? ' selected' : ''}`}>
            Light
          </div>
          <div onClick={() => setTheme('dark')} className={`option${theme === 'dark' ? ' selected' : ''}`}>
            Dark
          </div>
        </div>
      </div>
    </div>
  )
}

const SettingsMenu = connect(ConnectedSettingsMenu)
export default SettingsMenu
