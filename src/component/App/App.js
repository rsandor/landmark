import React, { Component } from 'react'
import './App.scss'

import { connect } from './App.props'
import NoteGenerator from '../../common/NoteGenerator'
import { renderNote } from '../../common/NoteRenderer'

function SettingsMenu ({ settings, setBassClef, setGrandStaff, setTrebleClef, toggleNotes, setTheme, visible }) {
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

function FlashCard ({ clef, note, noteVisible, visible, onMouseDown }) {
  if (!visible) return null
  const src = renderNote(note, clef)
  const alt = `Staff displaying ${note} on the ${clef} clef.`
  return (
    <div className="FlashCard" onMouseDown={onMouseDown}>
      <div className="Staff"><img src={src} alt={alt} /></div>
      <div className={`Answer ${noteVisible ? 'visible' : ''}`}>{noteVisible ? note.replace('/', '').toUpperCase() : '?'}</div>
    </div>
  )
}

class ConnectedApp extends Component {
  constructor (props) {
    super(props)
    const { clef, note } = NoteGenerator.next()
    this.state = {
      clef,
      note,
      noteVisible: false,
      settingsOpen: false
    }
  }

  get onFlashCardClick () {
    return () => this.setState(prev => {
      if (!prev.noteVisible) {
        return { noteVisible: true }
      }
      const { clef, note } = NoteGenerator.next()
      return { clef, note, noteVisible: false }
    })
  }

  get onToggleSettings () {
    return () => this.setState(prev => ({ settingsOpen: !prev.settingsOpen }))
  }

  render () {
    return (
      <div className={`App ${this.state.settingsOpen ? 'settings' : ''} theme-${this.props.settings.theme}`}>
        <header className="clearfix">
          <h1>
            Landmark
            <div className="menu-toggle" onClick={this.onToggleSettings}>
              <i className="material-icons md-36">menu</i>
            </div>
          </h1>
        </header>
        <main>
          <FlashCard visible={!this.state.settingsOpen}
            clef={this.state.clef}
            note={this.state.note}
            noteVisible={this.state.noteVisible}
            onMouseDown={this.onFlashCardClick} />
          <SettingsMenu visible={this.state.settingsOpen}
            settings={this.props.settings}
            setTrebleClef={this.props.setTrebleClef}
            setBassClef={this.props.setBassClef}
            setGrandStaff={this.props.setGrandStaff}
            toggleNotes={this.props.toggleNotes}
            setTheme={this.props.setTheme} />
        </main>
      </div>
    )
  }
}

const App = connect(ConnectedApp)
export default App
