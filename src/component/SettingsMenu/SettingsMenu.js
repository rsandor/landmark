import React from 'react'
import './SettingsMenu.scss'

import { connect } from './SettingsMenu.props'
import FlexSelector from '../FlexSelector'

function ConnectedSettingsMenu ({ settings, setContext, setStaff, setTheme, toggleNotes, visible }) {
  if (!visible) return null

  const { notes, staff, theme } = settings

  const staffOptions = [
    { label: 'Grand (Piano)', selected: staff === 'grand', onClick: () => setStaff('grand') },
    { label: 'Treble (G)', selected: staff === 'treble', onClick: () => setStaff('treble') },
    { label: 'Bass (F)', selected: staff === 'bass', onClick: () => setStaff('bass') },
  ]

  const noteOptions = [
    { label: 'Root', selected: notes.root, onClick: () => toggleNotes('root') },
    {
      label: (<span>2<sup><small>nd</small></sup> &amp; 7<sup><small>th</small></sup></span>),
      selected: notes.second,
      onClick: () => toggleNotes('second')
    },
    {
      label: (<span>3<sup><small>rd</small></sup> &amp; 6<sup><small>th</small></sup></span>),
      selected: notes.third,
      onClick: () => toggleNotes('third')
    },
  ]

  const themeOptions = [
    { label: 'Light', selected: theme === 'light', onClick: () => setTheme('light') },
    { label: 'Dark', selected: theme === 'dark', onClick: () => setTheme('dark') },
  ]

  const contextOptions = [
    { label: 'Whole', selected: settings.context === 'whole', onClick: () => setContext('whole') },
    { label: 'Random (Rests)', selected: settings.context === 'random-rests', onClick: () => setContext('random-rests') },
    { label: 'Random (Notes)', selected: settings.context === 'random-notes', onClick: () => setContext('random-notes') },
  ]

  return (
    <div className="SettingsMenu">
      <h2>Settings</h2>

      <div className="section">
        <h3>Staff</h3>
        <FlexSelector options={staffOptions} />
      </div>

      <div className="section">
        <h3>Notes</h3>
        <FlexSelector options={noteOptions} />
        <FlexSelector options={contextOptions} />
      </div>

      <div className="section">
        <h3>Theme</h3>
        <FlexSelector options={themeOptions} />
      </div>
    </div>
  )
}

const SettingsMenu = connect(ConnectedSettingsMenu)
export default SettingsMenu
