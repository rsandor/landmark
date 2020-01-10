import React, { Component } from 'react'
import './App.css'

import { connect } from './App.props'
import NoteGenerator from '../../common/NoteGenerator'
import Staff from '../Staff'

class ConnectedApp extends Component {
  constructor (props) {
    super(props)
    const { clef, note } = NoteGenerator.next()
    this.state = { clef, note, visible: false }
  }

  get onMouseDown () {
    return () => this.setState(prev => {
      if (!prev.visible) {
        return { visible: true }
      }
      const { clef, note } = NoteGenerator.next()
      return { clef, note, visible: false }
    })
  }

  render () {
    const { note, clef, visible } = this.state
    return (
      <div className="App" onMouseDown={this.onMouseDown}>
        <h1>Landmark</h1>
        <br />
        <Staff note={note} clef={clef} />
        <div className="Answer">{visible ? note.replace('/', '').toUpperCase() : '?'}</div>
      </div>
    )
  }
}

const App = connect(ConnectedApp)
export default App
