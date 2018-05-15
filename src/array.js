import { obj } from './object'

// ======== Array
const isArray = a => a && Array.isArray(a)

const get = (a, index, defaultValue) => (isArray(a) && typeof a[index] !== 'undefined' ? a[index] : defaultValue)

const objByKey = (a, key) => {
  if (!isArray(a)) {
    return {}
  }
  return a.reduce(
    (agg, t) => {
      const okey = obj.get(t, key, 'default')
      const oval = obj.get(agg, okey, [])
      return {
        ...agg,
        [okey]: [...oval, t],
      }
    },
    {}
  )
}

const objByPages = (a, rows = 0) => {
  if (!isArray(a)) {
    return { 1: [] }
  }
  const inRows = (!Number.isInteger(rows) || rows === 0 ? 10 : rows)
  return a.reduce(
    (agg, t, i) => {
      const okey = Math.trunc(i / inRows) + 1
      const oval = obj.get(agg, okey, [])
      return {
        ...agg,
        [okey]: [...oval, t],
      }
    },
    {}
  )
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
  get,
  objByKey,
  objByPages,
  hasintersect,
  unique,
  keyUnique,
}


export default arr
