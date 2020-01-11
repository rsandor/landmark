import React from 'react'
import './FlexSelector.scss'

function FlexSelectorOption ({ children, selected, onClick }) {
  const className = `FlexSelectorOption${selected ? ' selected' : ''}`
  return (
    <div className={className} onClick={onClick}>{children}</div>
  )
}

export default function FlexSelector ({ options }) {
  const optionEls = options.map((opt, index) => (
    <FlexSelectorOption key={index} selected={opt.selected} onClick={opt.onClick}>{opt.label}</FlexSelectorOption>
  ))
  return <div className="FlexSelector">{optionEls}</div>
}
