import React, { Component, PureComponent } from 'react'
import './App.scss'

import { connect } from './App.props'
import NoteGenerator from '../../common/NoteGenerator'
import { renderNote } from '../../common/NoteRenderer'
import SettingsMenu from '../SettingsMenu'

class Staff extends PureComponent {
  render () {
    const { clef, note, context, showClefs, staff, theme } = this.props
    const src = renderNote(clef, note, { context, showClefs, staff, theme })
    const alt = `Staff displaying ${note} on the ${clef} clef.`
    return <div className="Staff"><img src={src} alt={alt} /></div>
  }
}

function ConnectedFlashCard ({ clef, note, noteVisible, onMouseDown, visible, settings }) {
  if (!visible) return null
  return (
    <div className="FlashCard" onMouseDown={onMouseDown}>
      <Staff clef={clef}
        note={note}
        context={settings.context}
        staff={settings.staff}
        showClefs={settings.showClefs}
        theme={settings.theme} />
      <div className={`Answer ${noteVisible ? 'visible' : ''}`}>{noteVisible ? note.replace('/', '').toUpperCase() : '?'}</div>
    </div>
  )
}
const FlashCard = connect(ConnectedFlashCard)

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
            staff={this.props.settings.staff}
            theme={this.props.settings.theme}
            noteVisible={this.state.noteVisible}
            onMouseDown={this.onFlashCardClick} />
          <SettingsMenu visible={this.state.settingsOpen} />
        </main>
      </div>
    )
  }
}

const App = connect(ConnectedApp)
export default App
