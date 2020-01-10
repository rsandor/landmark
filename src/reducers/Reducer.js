import { ActionLog, noop, updateObject } from './util'
import defaultsDeep from 'lodash/defaultsDeep'

export default class Reducer {
  constructor (namespace, initialState = {}) {
    this.namespace = namespace
    this._initialState = initialState
    this.actions = new Map()
    this.validators = new Map()
    this.log = false
  }

  get initialState () {
    return defaultsDeep({}, this._initialState)
  }

  toggleLog () {
    this.log = !this.log
  }

  action (name, reducer) {
    if (!reducer) {
      return this.actions.get(name)
    }
    this.actions.set(`${this.namespace}/${name}`, reducer)
    return (payload = {}) => {
      const action = { type: `${this.namespace}/${name}`, payload }
      try {
        const validator = this.validators.get(name) || (() => { })
        validator(payload)
        return action
      } catch (err) {
        ActionLog.error(action, err)
        return noop
      }
    }
  }

  validate (name, validator) {
    this.validators.set(`${this.namespace}/${name}`, validator)
  }

  get reducer () {
    return (state, action) => {
      if (this.log) ActionLog.log(action)
      const next = updateObject(state || this.initialState, {})
      if (this.actions.has(action.type)) {
        this.actions.get(action.type)(next, action.payload, action)
      }
      return next
    }
  }
}
