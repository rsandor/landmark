import isEmpty from 'lodash/isNil'
import isString from 'lodash/isString'

/**
 * No operation action. Can be returned by action generators on invalid
 * payloads, etc.
 */
export const noop = { type: '', payload: {} }

/**
 * Helper method for handling object updates within reducers.
 * @param {object} oldObject Object to update.
 * @param {object} newValues New values for the object.
 * @return {object} A copy of the old object with new values.
 */
export function updateObject (oldObject, newValues) {
  return Object.assign({}, oldObject, newValues)
}

/**
 * Logs an action and message via the given logging method.
 * @param {function} method Logging method to use.
 * @param {object} action Redux action.
 * @param {string} message Log message.
 * @param {string} prefix Prefix filter.
 * @param {array<string>} exclude Actions to exclude from logging.
 */
function actionLog (method, action, message = '', prefix = null, exclude = []) {
  const excludeSet = new Set(exclude)
  if (excludeSet.has(action.type)) {
    return
  }
  if (isString(prefix) && !isEmpty(prefix) && !action.type.startsWith(prefix)) {
    return
  }
  method(action.type, action.payload, message)
}

/**
 * Console logger for actions.
 * @author Ryan Sandor Richards
 */
export class ActionLog {
  /**
   * Logs the given redux action via `console.log`.
   * @param {object} action Redux action to log.
   * @param {string} message Message.
   */
  static log (action, message, prefix, exclude) {
    actionLog(console.log.bind(console), action, message, prefix, exclude)
  }

  /**
   * Logs the given redux action and message via `console.warn`.
   * @param {object} action Redux action.
   * @param {string} message Message.
   */
  static warn (action, message, prefix, exclude) {
    actionLog(console.warn.bind(console), action, message, prefix, exclude)
  }

  /**
   * Logs the given redux action and message via `console.error`.
   * @param {object} action Redux action.
   * @param {string} message Message.
   */
  static error (action, message, prefix, exclude) {
    actionLog(console.error.bind(console), action, message, prefix, exclude)
  }
}
