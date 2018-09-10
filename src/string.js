import { arr } from './array'
import { obj } from './object'

// =========== String
const template = (strings, ...keys) => (...values) => {
  const dict = arr.get(values, [values.length - 1], {})
  return strings.reduce((accumulator, part, i) => accumulator
    + (Number.isInteger(keys[i - 1]) ?
      arr.get(values, keys[i - 1], '')
      : obj.get(dict, keys[i - 1], ''))
    + part)
}

const cmp = (a, b) => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

const toBoolean = (s) => {
  const falsy = /^(?:f(?:alse)?|no?|0+)$/i
  return !falsy.test(s) && !!s
}

const ucFirst = string => ((typeof string === 'string' || string instanceof String) ? string.charAt(0)
  .toUpperCase() + string.slice(1)
  .toLowerCase() : string)

const short = (a, b) => {
  a = a.toString()
  b = b.toString()
  let n = 0
  let i = 0
  for (i = 0, n = Math.max(a.length, b.length); i < n && a.charAt(i) === b.charAt(i); ++i) {
  }
  if (i === n) return 0
  return a.charAt(i) > b.charAt(i) ? -1 : 1
}

const search = (str1, str2) => String(str1 || ''.toLowerCase())
  .includes(String(str2 || ''.toLowerCase()))

const btoa = str => Buffer.from(str)
  .toString('base64')

const checkport = (host, port) => (host.indexOf(':') === -1 ? `${host}:${port}` : host)

const getCookie = (name) => {
  if (typeof document !== 'undefined') {
    const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`) // eslint-disable-line no-undef
    return v ? v[2] : undefined
  }
  return undefined
}

export const str = {
  template,
  cmp,
  toBoolean,
  ucFirst,
  short,
  search,
  btoa,
  checkport,
  getCookie,
}

export default str
