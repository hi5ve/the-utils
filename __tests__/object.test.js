import { obj } from '../src/object'

// jest.setTimeout(100000)
// beforeAll(async () => {})

const o = { a: 2, b: 1 }
const o1 = { a: { a1: 2, a2: 5 }, b: 1 }

function Person(first, last, age, eye) {
  this.firstName = first
  this.lastName = last
  this.age = age
  this.eyeColor = eye
}

const p = new Person('First', 'Last', 5, 'brown')

describe('the-utils/obj.isObject(o)', () => {
  test('null is not an object', async () => {
    expect(obj.isObject(null))
      .toBeFalsy()
  })
  test('undefined is not an object', async () => {
    expect(obj.isObject(undefined))
      .toBeFalsy()
  })
  test('array is not an object', async () => {
    expect(obj.isObject([1, 2, 3]))
      .toBeFalsy()
  })
  test('{} is an object', async () => {
    expect(obj.isObject({}))
      .toBeTruthy()
  })
  test('{ a: 2, b: 1 } is an object', async () => {
    expect(obj.isObject(o))
      .toBeTruthy()
  })
  test('Person is an object', async () => {
    expect(obj.isObject(p))
      .toBeTruthy()
  })
  test('String is not an object', async () => {
    expect(obj.isObject(String('abc')))
      .toBeFalsy()
  })
})

describe('the-utils/obj.has(o, property)', () => {
  test('null has no a', async () => {
    expect(obj.has(null, 'a'))
      .toBeFalsy()
  })
  test('undefined has no a', async () => {
    expect(obj.has(undefined, 'a'))
      .toBeFalsy()
  })
  test('{} has no a', async () => {
    expect(obj.has({}, 'a'))
      .toBeFalsy()
  })
  test('{ a: 2, b: 1 } has a', async () => {
    expect(obj.has(o, 'a'))
      .toBeTruthy()
  })
  test('{ a: 2, b: 1 } has a', async () => {
    expect(obj.has(o, 'a'))
      .toBeTruthy()
  })
  test('Person has firstName', async () => {
    expect(obj.has(p, 'firstName'))
      .toBeTruthy()
  })
})

describe('the-utils/obj.get(o, property, defaultValue)', () => {
  test('get a of null returns default', async () => {
    expect(obj.get(null, 'a', 1))
      .toBe(1)
  })
  test('get a of undefined returns default', async () => {
    expect(obj.get(undefined, 'a', 1))
      .toBe(1)
  })
  test('get a of {} returns default', async () => {
    expect(obj.get({}, 'a', 1))
      .toBe(1)
  })
  test('get c of { a: 2, b: 1 } returns default', async () => {
    expect(obj.get({}, 'c', 1))
      .toBe(1)
  })
  test('get a of { a: 2, b: 1 } returns 2', async () => {
    expect(obj.get(o, 'a', 1))
      .toBe(2)
  })
  test('get a of Person returns default', async () => {
    expect(obj.get(p, 'a', 1))
      .toBe(1)
  })
  test('get firstName of Person returns First', async () => {
    expect(obj.get(p, 'firstName', 1))
      .toBe('First')
  })
})

describe('the-utils/obj.set(o, property, value)', () => {
  test('set a of null returns {a:1}', async () => {
    expect(obj.set(null, 'a', 1))
      .toEqual(expect.objectContaining({
        a: 1,
      }))
  })
  test('set a of undefined returns {a:1}', async () => {
    expect(obj.set(undefined, 'a', 1))
      .toEqual(expect.objectContaining({
        a: 1,
      }))
  })
  test('set a of {} returns {a:1}', async () => {
    expect(obj.set({}, 'a', 1))
      .toEqual(expect.objectContaining({
        a: 1,
      }))
  })
  test('get c of { a: 2, b: 1 } returns { a: 2, b: 1, c:3 }', async () => {
    expect(obj.set(o, 'c', 3))
      .toEqual(expect.objectContaining({
        a: 2, b: 1, c: 3,
      }))
  })

  test('set a of Person returns Person.a == 1', async () => {
    expect(obj.set(o, 'a', 1))
      .toEqual(expect.objectContaining({
        ...Person, a: 1,
      }))
  })
})

describe('the-utils/obj.isEmpty(o)', () => {
  test('null is Empty', async () => {
    expect(obj.isEmpty(null))
      .toBeTruthy()
  })
  test('undefined is Empty', async () => {
    expect(obj.isEmpty(undefined))
      .toBeTruthy()
  })
  test('{} is Empty', async () => {
    expect(obj.isEmpty({}))
      .toBeTruthy()
  })
  test('{ a: 2, b: 1 } is not Empty', async () => {
    expect(obj.isEmpty(o))
      .toBeFalsy()
  })
})

describe('the-utils/obj.toArray(o)', () => {
  test('null is Empty array', async () => {
    const r = obj.toArray(null)
    expect(r)
      .toHaveLength(0)
    expect(r)
      .toEqual(expect.arrayContaining([]))
  })
  test('undefined is Empty array', async () => {
    const r = obj.toArray(undefined)
    expect(r)
      .toHaveLength(0)
    expect(r)
      .toEqual(expect.arrayContaining([]))
  })
  test('{} is Empty array', async () => {
    const r = obj.toArray({})
    expect(r)
      .toHaveLength(0)
    expect(r)
      .toEqual(expect.arrayContaining([]))
  })
  test('{ a: 2, b: 1 } is [ 2, 1 ]', async () => {
    const r = obj.toArray(o)
    expect(r)
      .toHaveLength(2)
    expect(r)
      .toEqual(expect.arrayContaining([2, 1]))
  })
  test('Person is [ \'First\', \'Last\', 5, \'brown\' ]', async () => {
    const r = obj.toArray(p)
    expect(r)
      .toHaveLength(4)
    expect(r)
      .toEqual(expect.arrayContaining([
        'First',
        'Last',
        5,
        'brown',
      ]))
  })
})

describe('the-utils/obj.deepGet(obj, props, defaultValue)', () => {
  test('null returns default', async () => {
    expect(obj.deepGet(null, ['a'], 1))
      .toEqual(1)
  })
  test('undefined returns default', async () => {
    expect(obj.deepGet(undefined, ['a'], 1))
      .toEqual(1)
  })
  test('{} returns default', async () => {
    expect(obj.deepGet(undefined, ['a'], 1))
      .toEqual(1)
  })
  test('a of { a: 2, b: 1 } returns 2', async () => {
    expect(obj.deepGet(o, ['a'], 1))
      .toEqual(2)
  })
  test('a of { a: { a1: 2, a2: 5}, b: 1 } returns 5', async () => {
    expect(obj.deepGet(o1, ['a', 'a2'], 1))
      .toEqual(5)
  })
  test('a of { a: { a1: 2, a2: 5}, b: 1 } returns default', async () => {
    expect(obj.deepGet(o1, ['a', 'a3'], 1))
      .toEqual(1)
  })
})

describe('the-utils/obj.toArrayFilter(obj, props, defaultValue)', () => {
  test('null returns empty array', async () => {
    const r = obj.toArrayFilter(null, /_test/)
    expect(r)
      .toHaveLength(0)
    expect(r)
      .toEqual(expect.arrayContaining([]))
  })
  test('undefined returns empty array', async () => {
    const r = obj.toArrayFilter(undefined, /_test/)
    expect(r)
      .toHaveLength(0)
    expect(r)
      .toEqual(expect.arrayContaining([]))
  })
  test('{} returns empty array', async () => {
    const r = obj.toArrayFilter({}, /_test/)
    expect(r)
      .toHaveLength(0)
    expect(r)
      .toEqual(expect.arrayContaining([]))
  })
  test('{ a: 2, b: 1 } returns empty array', async () => {
    const r = obj.toArrayFilter(o, /_test/)
    expect(r)
      .toHaveLength(0)
    expect(r)
      .toEqual(expect.arrayContaining([]))
  })
  test('Person returns empty array', async () => {
    const r = obj.toArrayFilter(p, /_test/)
    expect(r)
      .toHaveLength(0)
    expect(r)
      .toEqual(expect.arrayContaining([]))
  })
  test('Person returns empty array', async () => {
    const r = obj.toArrayFilter(p, /Name$/)
    expect(r)
      .toHaveLength(2)
    expect(r)
      .toEqual(expect.arrayContaining([
        'First',
        'Last',
      ]))
  })
})

describe('the-utils/obj.filterKeys(obj, r)', () => {
  test('null returns empty object', async () => {
    const r = obj.filterKeys(null, /_test/)
    expect(Object.keys(r))
      .toHaveLength(0)
    expect(r)
      .toEqual(expect.objectContaining({}))
  })
  test('undefined returns empty object', async () => {
    const r = obj.filterKeys(undefined, /_test/)
    expect(Object.keys(r))
      .toHaveLength(0)
    expect(r)
      .toEqual(expect.objectContaining({}))
  })
  test('{} returns empty object', async () => {
    const r = obj.filterKeys({}, /_test/)
    expect(Object.keys(r))
      .toHaveLength(0)
    expect(r)
      .toEqual(expect.objectContaining({}))
  })
  test('{ a: 2, b: 1 } returns empty object', async () => {
    const r = obj.filterKeys(o, /_test/)
    expect(Object.keys(r))
      .toHaveLength(0)
    expect(r)
      .toEqual(expect.objectContaining({}))
  })
  test('Person returns empty object with /_test/', async () => {
    const r = obj.filterKeys(p, /_test/)
    expect(Object.keys(r))
      .toHaveLength(0)
    expect(r)
      .toEqual(expect.objectContaining({}))
  })
  test('Person returns non empty object with /Name$/', async () => {
    const r = obj.filterKeys(p, /Name$/)
    expect(Object.keys(r))
      .toHaveLength(2)
    expect(r)
      .toEqual(expect.objectContaining({ firstName: 'First', lastName: 'Last' }))
  })
})

describe('the-utils/obj.cast(fields, props)', () => {
  test('null fields returns empty object', async () => {
    const r = obj.cast(null, { a: 1, b: 2 })
    expect(Object.keys(r))
      .toHaveLength(0)
    expect(r)
      .toEqual(expect.objectContaining({}))
  })
  test('null object returns defaults', async () => {
    const r = obj.cast({ a: 1, b: 2 }, null)
    expect(Object.keys(r))
      .toHaveLength(2)
    expect(r)
      .toEqual(expect.objectContaining({ a: 1, b: 2 }))
  })
})
