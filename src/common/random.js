/**
 * @param {number} max Upper bound (exclusive) for the random integer.
 * @return {number} A uniform random integer from `[0, max)`.
 */
export function randomInt (max) {
  return Math.floor(Math.random() * max)
}

/**
 * @param {Array} array Array from which to pick a uniform random element.
 * @return {*} A uniform random element from the array.
 */
export function randomElement (array) {
  return array[randomInt(array.length)]
}

/**
 * Shuffles the given array, in place.
 * @param {Array} array The array to shuffle.
 */
export function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = randomInt(i + 1)
    const a = array[i]
    const b = array[j]
    array[i] = b
    array[j] = a
  }
}

/**
 * @return {array} An array containing a randomly generated set of durations
 *   for a 4/4 bar containing whole, half, and quarter notes.
 */
export function randomBarDurations () {
  const durations = []
  let remaining = 8
  while (remaining > 0) {
    const uniform = Math.random()
    if (uniform < 0.15 && remaining >= 8) {
      durations.push('1')
      remaining -= 8
    } else if (uniform < 0.3 && remaining >= 4) {
      durations.push('2')
      remaining -= 4
    } else {
      durations.push('4')
      remaining -= 2
    }
  }
  return durations
}
