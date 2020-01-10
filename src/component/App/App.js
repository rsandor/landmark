import React from 'react'
import { connect } from './App.props'
import './App.css'

function ConnectedApp ({ settings, toggle }) {
  return (
    <div className="App" onClick={() => toggle()}>
      <h1>Landmark</h1>
      <p>{settings.foo}</p>
    </div>
  )
}

const App = connect(ConnectedApp)
export default App
