// ========= Object
const has = (o, property) => Object.prototype.hasOwnProperty.call(o, property)
const getKeyValue = (o, property, defaultValue) => (o !== undefined && has(o, property) ? o[property] : defaultValue)
const get = (o, property, defaultValue) => (o !== undefined && has(o, property) ? o[property] : defaultValue)
const set = (o, property, value) => {
  // const  = { ...o }
  o[property] = value
  return o
}
const deepGet = (obj, props, defaultValue) => {
  // If we have reached an undefined/null property
  // then stop executing and return the default value.
  // If no default is provided it will return undefined.
  if (obj === undefined || obj === null) {
    return defaultValue
  }

  // If the path array has no more elements, we've reached
  // the intended property and return its value
  if (props.length === 0) {
    return obj
  }

  // Prepare our found property and path array for recursion
  const foundSoFar = obj[props[0]]
  const remainingProps = props.slice(1)

  return deepGet(foundSoFar, remainingProps, defaultValue)
}
const isEmpty = o => !(o.constructor === Object && Object.keys(o).length > 0)
const toArray = o => Object.keys(o)
  .map(t => o[t])
const toArrayFilter = (o, r) => Object.keys(o)
  .filter(t => r.test(t))
  .map(t => o[t])

export const obj = {
  has,
  getKeyValue,
  get,
  set,
  deepGet,
  isEmpty,
  toArray,
  toArrayFilter,
}

export default obj
