import React, { Component } from 'react'
import './App.css'

import { connect } from './App.props'
import Staff from '../Staff'

const notesByClef = {
  treble: ['c/4', 'g/4', 'c/5', 'g/5', 'c/6'],
  bass: ['c/4', 'f/3', 'c/3', 'f/2', 'c/2']
}

class ConnectedApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      note: 'c/4',
      clef: 'treble',
      visible: false
    }
  }

  get onClickHandler () {
    return () => this.setState(prev => {
      if (!prev.visible) {
        return { visible: true }
      }

      const clef = Math.random() < 0.5 ? 'treble' : 'bass'
      const noteIndex = (notesByClef[clef].length * Math.random())|0
      const note = notesByClef[clef][noteIndex]
      return { visible: false, note, clef }
    })
  }

  render () {
    const { note, clef, visible } = this.state
    return (
      <div className="App" onClick={this.onClickHandler}>
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
