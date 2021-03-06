import isNil from 'lodash/isNil'
import Reducer from './Reducer'

function getCurrentTime () {
  return Math.floor(new Date().getTime() / 1000)
}

function format (time) {
  const { currentTime, expiryTime } = time
  if (isNil(expiryTime) || isNil(currentTime)) {
    return '00:00'
  }

  const delta = expiryTime - currentTime
  if (delta < 0) {
    return '00:00'
  }

  const minutes = Math.floor(delta / 60)
  let seconds = delta - minutes * 60
  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  return `${minutes}:${seconds}`
}

const Timer = new Reducer('Landmark/timer', {
  duration: 1,
  state: 'stopped',
  currentTime: getCurrentTime(),
  expiryTime: null
})

const durations = new Set([1, 5, 10, 15])
const states = new Set(['stopped', 'running', 'complete'])

const clearComplete = Timer.action('clearComplete', next => {
  if (next.state === 'complete') {
    next.state = 'stopped'
  }
})

const setDuration = Timer.action('setDuration', (next, payload) => {
  if (durations.has(payload.duration)) {
    next.duration = payload.duration
  }
})

const setState = Timer.action('setState', (next, payload) => {
  if (!states.has(payload.state)) return

  const { state } = next
  if (state === 'stopped' || state === 'complete') {
    if (payload.state === 'running') {
      next.expiryTime = getCurrentTime() + 60 * next.duration
      next.state = 'running'
    }
  } else if (state === 'running') {
    if (payload.state === 'stopped') {
      next.expiryTime = null
      next.state = 'stopped'
    } else if (payload.state === 'complete') {
      next.expiryTime = null
      next.state = 'complete'
    }
  }
})

const updateCurrentTime = Timer.action('updateCurrentTime', next => {
  next.currentTime = getCurrentTime()
  if (!isNil(next.expiryTime) && next.expiryTime - next.currentTime <= 0) {
    next.state = 'complete'
    next.expiryTime = null
  }
})

export default Timer.reducer
export { clearComplete, format, setDuration, setState, updateCurrentTime }
