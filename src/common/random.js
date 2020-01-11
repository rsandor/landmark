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
