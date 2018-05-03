import { obj } from './object'

// ======== Array
const isArray = a => a && Array.isArray(a)

const objByKey = (a, key) => (isArray(a) ? a.reduce(
  (n, t) => {
    (n[t[key]] || (n[t[key]] = [])).push(t)
    return n
  },
  {}
) : {}
)

const getArrValue = (a, index, defaultValue) => (typeof a[index] !== 'undefined' ? a[index] : defaultValue)

const objByPages = (a, rows) => {
  const inRows = (rows === 0 ? 10 : rows)
  return isArray(a) ? a.reduce(
    (n, t, i) => {
      const j = Math.trunc(i / inRows);
      (n[j] || (n[j] = [])).push(t)
      return n
    },
    {}
  ) : {}
}

/**
 * Checks whenever 2 arrays have intersection
 *
 * @param {Array} a
 * @param {Array} b
 *
 * @return {Boolean}
 */
export const hasintersect = (a, b) => a.reduce((r, x) => r || b.includes(x), false)

/**
 * Returns unique values from 2 arrays
 * @param {Array} a
 * @param {Array} b
 *
 * @return {Array}
 */
export const unique = (a, b) => b.reduce(
  (r, x) => (r.includes(x) ? r : [...r, x]),
  a.reduce((r, x) => (r.includes(x) ? r : [...r, x]), []),
)

/**
 *
 * @param a
 */
export const keyUnique = (a, key) => a.reduce(
  (r, x) => [...unique(r, obj.get(x, key, []))],
  [],
)

export const arr = {
  isArray,
  objByKey,
  getArrValue,
  objByPages,
  hasintersect,
  unique,
  keyUnique,
}


export default arr
