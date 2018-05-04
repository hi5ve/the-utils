// ========= Object
const isObject = o => (typeof o === 'object'
  && o !== null
  && o !== undefined
  && Object.prototype.toString.call(o) === '[object Object]')

const has = (o, property) => isObject(o) && Object.prototype.hasOwnProperty.call(o, property)

const get = (o, property, defaultValue) => (o !== undefined && has(o, property) ? o[property] : defaultValue)

const set = (o, property, value) => ({ ...o, [property]: value })

const isEmpty = o => !(isObject(o) && o.constructor === Object && Object.keys(o).length > 0)

const toArray = o => (isObject(o) ? Object.keys(o)
  .map(t => o[t]) : [])

const deep = (obj, props, defaultValue) => {
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

  return deep(foundSoFar, remainingProps, defaultValue)
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


const toArrayFilter = (o, r) => (isObject(o) ? Object.keys(o)
  .filter(t => r.test(t))
  .map(t => o[t]) : [])

const filterKeys = (o, r) => (isObject(o) ? Object.keys(o)
  .filter(t => r.test(t))
  .reduce(
    (n, t) => set(n, t, o[t]),
    {}
  ) : {})

const cast = (fields, props) => {
  const items = (isObject(fields) ? Object.keys(fields) : [])
  const item = items.reduce(
    (acc, val) => set(acc, val, get(props, val, fields[val])),
    {}
  )
  if (has(props, '_id')) {
    set(item, '_id', get(props, '_id', 0))
    // item['_id'] = get(props, '_id', 0)
  }
  return item
}

export const createFilter = (fields, props) => Object.keys(fields)
  .reduce(
    (acc, val) => (has(props, val) ? set(acc, val, get(props, val, fields[val])) : acc),
    {}
  )

export const changeKey = (o, key, f, def = '') => set(o, key, f(get(o, key, def)))

export const deepChangeKey = (o, key, f, def = '') => Object.keys(o)
  .reduce((a, c) => set(a, c, changeKey(o[c], key, f, def)), {})

// ========= Exports
export const obj = {
  has,
  get,
  set,
  deep,
  deepGet,
  changeKey,
  deepChangeKey,
  isEmpty,
  toArray,
  toArrayFilter,
  cast,
  createFilter,
  filterKeys,
  isObject,
}

export default obj
