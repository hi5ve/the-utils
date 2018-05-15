import { arr } from '../src/array'

// jest.setTimeout(100000)
// beforeAll(async () => {})
function Person(first, last, age, eye) {
  this.firstName = first
  this.lastName = last
  this.age = age
  this.eyeColor = eye
}

const a = [1, 2, 3]
const p = new Person('First', 'Last', 5, 'brown')

const aOffObjs = [
  new Person('First1', 'Last1', 5, 'brown'),
  new Person('First2', 'Last2', 15, 'green'),
  new Person('First3', 'Last3', 25, 'grey'),
  new Person('First4', 'Last4', 15, 'blue'),
  new Person('First5', 'Last5', 25, 'brown'),
  new Person('First6', 'Last6', 5, 'red'),
  new Person('First7', 'Last7', 15, 'brown'),
  new Person('First8', 'Last8', 25, 'blue'),
  new Person('First9', 'Last9', 5, 'grey'),
  new Person('First10', 'Last10', 15, 'brown'),
]

// isArray,
describe('the-utils/arr.isArray(a)', () => {
  test('null is not an array', async () => {
    expect(arr.isArray(null))
      .toBeFalsy()
  })
  test('undefined is not an array', async () => {
    expect(arr.isArray(undefined))
      .toBeFalsy()
  })
  test('array is not an array', async () => {
    expect(arr.isArray([1, 2, 3]))
      .toBeTruthy()
  })
  test('{} is an array', async () => {
    expect(arr.isArray({}))
      .toBeFalsy()
  })
  test('{ a: 2, b: 1 } is an array', async () => {
    expect(arr.isArray(a))
      .toBeTruthy()
  })
  test('Person is an array', async () => {
    expect(arr.isArray(p))
      .toBeFalsy()
  })
  test('String is not an array', async () => {
    expect(arr.isArray(String('abc')))
      .toBeFalsy()
  })
})

// getArrValue,
describe('the-utils/arr.get(a)', () => {
  test('get 2 of null returns default', async () => {
    expect(arr.get(null, 2, 1))
      .toBe(1)
  })
  test('get 2 of undefined returns default', async () => {
    expect(arr.get(undefined, 2, 1))
      .toBe(1)
  })
  test('get 2 of {} returns default', async () => {
    expect(arr.get({}, 2, 1))
      .toBe(1)
  })
  test('get 2 of Person returns default', async () => {
    expect(arr.get(p, 2, 1))
      .toBe(1)
  })
  test('get firstName of Person returns First', async () => {
    expect(arr.get(p, 'firstName', 1))
      .toBe(1)
  })
  test('get 2 of [1, 2, 3] returns 3', async () => {
    expect(arr.get(a, 2, 1))
      .toBe(3)
  })
})

// objByKey,
describe('the-utils/arr.objByKey(a)', () => {
  test('grouping by eyeColor null returns empty object', async () => {
    const result = arr.objByKey(null, 'eyeColor')
    expect(result)
      .toBeInstanceOf({}.constructor)
    expect(result)
      .toEqual(expect.objectContaining({}))
    expect(Object.keys(result))
      .toHaveLength(0)
  })
  test('grouping by eyeColor aOffObjs returns empty object', async () => {
    const result = arr.objByKey(aOffObjs, 'eyeColor')
    expect(result)
      .toBeInstanceOf({}.constructor)
    expect(result)
      .toEqual(expect.objectContaining({
        blue: expect.arrayContaining([]),
        brown: expect.arrayContaining([]),
        green: expect.arrayContaining([]),
        grey: expect.arrayContaining([]),
        red: expect.arrayContaining([]),
      }))
    expect(Object.keys(result))
      .toEqual(expect.arrayContaining(['red', 'brown', 'green', 'grey', 'red']))
    expect(Object.keys(result))
      .toHaveLength(5)
  })
})

// objByPages,
describe('the-utils/arr.objByPages(a)', () => {
  test('grouping by pages null returns empty object', async () => {
    const result = arr.objByPages(null, 10)
    expect(result)
      .toBeInstanceOf({}.constructor)
    expect(Object.keys(result))
      .toEqual(expect.arrayContaining(['1']))
    expect(result)
      .toEqual(expect.objectContaining({ 1: expect.arrayContaining([]) }))
    expect(Object.keys(result))
      .toHaveLength(1)
  })
  test('grouping by pages aOffObjs for undefined returns empty 1 page object', async () => {
    const result = arr.objByPages(aOffObjs, undefined)
    expect(result)
      .toBeInstanceOf({}.constructor)
    expect(Object.keys(result))
      .toEqual(expect.arrayContaining(['1']))
    expect(result)
      .toEqual(expect.objectContaining({ 1: expect.arrayContaining([]) }))
    expect(Object.keys(result))
      .toHaveLength(1)
  })
  test('grouping by pages aOffObjs returns pages by 10', async () => {
    const result = arr.objByPages(aOffObjs)
    expect(result)
      .toBeInstanceOf({}.constructor)
    expect(result)
      .toEqual(expect.objectContaining({
        1: expect.arrayContaining([]),
      }))
    expect(Object.keys(result))
      .toEqual(expect.arrayContaining(['1']))
    expect(result[1])
      .toHaveLength(10)
  })
  test('grouping by 10 pages aOffObjs pages by 10', async () => {
    const result = arr.objByPages(aOffObjs, 10)
    expect(result)
      .toBeInstanceOf({}.constructor)
    expect(result)
      .toEqual(expect.objectContaining({
        1: expect.arrayContaining([]),
      }))
    expect(Object.keys(result))
      .toEqual(expect.arrayContaining(['1']))
    expect(result[1])
      .toHaveLength(10)
  })
})
// hasintersect,
describe('the-utils/arr.hasintersect(a)', () => {
})
// unique,
describe('the-utils/arr.unique(a)', () => {
})
// keyUnique,
describe('the-utils/arr.keyUnique(a)', () => {
})
