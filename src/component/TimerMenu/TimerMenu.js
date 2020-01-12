import React from 'react'
import './TimerMenu.scss'

import { connect } from './TimerMenu.props'
import { format } from '../../reducers/timer'
import FlexSelector from '../FlexSelector'

function ConnectedTimerMenu ({ visible, timer, setDuration, setState }) {
  if (!visible) return null

  const { duration } = timer

  const durationOptions = [
    { label: '1m', selected: duration === 1, onClick: () => setDuration(1) },
    { label: '5m', selected: duration === 5, onClick: () => setDuration(5) },
    { label: '10m', selected: duration === 10, onClick: () => setDuration(10) },
    { label: '15m', selected: duration === 15, onClick: () => setDuration(15) },
  ]

  const toggleStart = () => {
    setState((timer.state === 'stopped') ? 'running' : 'stopped')
  }

  return (
    <div className="TimerMenu menu">
      <h2>Timer</h2>

      <div className="section">
        <FlexSelector options={durationOptions} />
      </div>

      <div className="current-time section">{format(timer)}</div>

      <div className="controls section">
        <div className={`button${timer.state === 'running' ? ' red' : ''}`} onClick={toggleStart}>
          {timer.state === 'stopped' ? 'Start' : 'Stop'}
        </div>
      </div>
    </div>
  )
}

const TimerMenu = connect(ConnectedTimerMenu)
export default TimerMenu
