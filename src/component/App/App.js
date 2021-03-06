import React, { Component, PureComponent } from 'react'
import './App.scss'

import { connect } from './App.props'
import { format } from '../../reducers/timer'
import NoteGenerator from '../../common/NoteGenerator'
import { renderNote } from '../../common/NoteRenderer'
import SettingsMenu from '../SettingsMenu'
import TimerMenu from '../TimerMenu'

class Staff extends PureComponent {
  render () {
    const { clef, note, context, showClefs, staff, theme } = this.props
    const src = renderNote(clef, note, { context, showClefs, staff, theme })
    const alt = `Staff displaying ${note} on the ${clef} clef.`
    return <div className="Staff"><img src={src} alt={alt} /></div>
  }
}

function ConnectedFlashCard ({ clef, note, seed, noteVisible, onMouseDown, visible, settings }) {
  if (!visible) return null
  return (
    <div className="FlashCard" onMouseDown={onMouseDown}>
      <Staff clef={clef}
        note={note}
        seed={seed}
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
    const seed = Math.random()
    this.state = {
      clef,
      note,
      seed,
      noteVisible: false,
      settingsOpen: false,
      timerOpen: false
    }
    this.timerInterval = null
    this.clearCompleteTimeout = false
  }

  componentDidMount () {
    if (!this.timerInterval) {
      this.timerInterval = setInterval(this.updateTimer.bind(this), 500)
    }
  }

  componentWillUnmount () {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
      this.timerInterval = null
    }
  }

  updateTimer () {
    this.props.updateCurrentTime()
    if (this.props.timer.state === 'complete' && !this.clearCompleteTimeout) {
      this.clearCompleteTimeout = true
      this.clearCompleteTimeout = setTimeout(() => {
        this.props.clearComplete()
        this.clearCompleteTimeout = false
      }, 5000)
    }
  }

  get isFlashCardVisible () {
    const { settingsOpen, timerOpen } = this.state
    return !settingsOpen && !timerOpen
  }

  get onFlashCardClick () {
    return () => this.setState(prev => {
      if (!prev.noteVisible) {
        return { noteVisible: true }
      }
      const { clef, note } = NoteGenerator.next()
      const seed = Math.random()
      return { clef, note, seed, noteVisible: false }
    })
  }

  get onToggleSettings () {
    return () => this.setState(prev => ({ settingsOpen: !prev.settingsOpen }))
  }

  get settingsToggle () {
    if (this.state.timerOpen) return null
    return (
      <div className="menu-toggle" onClick={this.onToggleSettings}>
        <i className="material-icons md-36">{this.state.settingsOpen ? 'close' : 'menu'}</i>
      </div>
    )
  }

  get onToggleTimer () {
    return () => this.setState(prev => ({ timerOpen: !prev.timerOpen }))
  }

  get timerToggle () {
    if (this.state.settingsOpen) return null
    return (
      <div className="timer-toggle" onClick={this.onToggleTimer}>
        <i className="material-icons md-36">{this.state.timerOpen ? 'close' : 'timer' }</i>
      </div>
    )
  }

  get currentTime () {
    if (this.state.settingsOpen) return null
    const { state } = this.props.timer
    if (state === 'running') {
      return <div className="current-time">{format(this.props.timer)}</div>
    }
    if (state === 'complete') {
      return <div className="current-time complete">0:00</div>
    }
    return null
  }

  render () {
    return (
      <div className={`App ${this.state.settingsOpen ? 'settings' : ''} theme-${this.props.settings.theme}`}>
        <header className="clearfix">
          <h1>Landmark</h1>
          {this.timerToggle}
          {this.currentTime}
          {this.settingsToggle}
        </header>
        <main>
          <FlashCard visible={this.isFlashCardVisible}
            clef={this.state.clef}
            note={this.state.note}
            seed={this.state.seed}
            noteVisible={this.state.noteVisible}
            onMouseDown={this.onFlashCardClick} />
          <SettingsMenu visible={this.state.settingsOpen} />
          <TimerMenu visible={this.state.timerOpen} onTimerStarted={this.onToggleTimer} />
        </main>
      </div>
    )
  }
}

const App = connect(ConnectedApp)
export default App
