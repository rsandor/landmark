import React, { Component } from 'react'
import './App.scss'

import { connect } from './App.props'
import NoteGenerator from '../../common/NoteGenerator'
import Staff from '../Staff'

function SettingsMenu ({ settings, setValue, visible }) {
  if (!visible) return null

  const onChange = e => {
    setValue({
      key: `notes.${e.target.name}`,
      value: e.target.checked
    })
  }

  return (
    <div className="SettingsMenu">
      <h2>Settings</h2>
      <p>
        <label>
          <input type="checkbox" name="root" checked={settings.notes.root} onChange={onChange} />
          Root
        </label>
      </p>
      <p>
        <label>
          <input type="checkbox" name="second" checked={settings.notes.second} onChange={onChange} />
          2nd
        </label>
      </p>
      <p>
        <label>
          <input type="checkbox" name="third" checked={settings.notes.third} onChange={onChange} />
          3rd
        </label>
      </p>
    </div>
  )
}

function FlashCard ({ clef, note, noteVisible, visible, onMouseDown }) {
  if (!visible) return null
  return (
    <div className="FlashCard" onMouseDown={onMouseDown}>
      <Staff note={note} clef={clef} />
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
      <div className={`App ${this.state.settingsOpen ? 'settings' : ''}`}>
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
            setValue={this.props.setValue} />
        </main>
      </div>
    )
  }
}

const App = connect(ConnectedApp)
export default App
