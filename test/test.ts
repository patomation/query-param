import 'mocha'
import { expect } from 'chai'
import { localStorageQueryParam, Params, queryParam } from '../src/index'
// Emulate global dom
import globalJsdom from 'jsdom-global'

let storage: {[key: string]: string} = {}
global.localStorage = {
  setItem: (key: string, value: string) => { storage[key] = value },
  getItem: (key: string) => storage[key],
  length: 0,
  key: (index: number) => `${index}`,
  removeItem: (key: string) => { delete storage[key] },
  clear: () => { storage = {} }
}

describe('queryParam does not break window undefined', (): void => {
  it('it can get expected params from url', (): void => {
    const expected: Params = {}
    const result = queryParam()
    expect(result).to.deep.equal(expected)
  })
})

describe('queryParam', (): void => {
  before(() => {
    globalJsdom('', {
      url: 'https://patomation.com/?cool=beans&fancy=param&trueParam=true&falseParam=false&sentence=Im%20the%20map&number=42'
    })
  })
  it('it can get expected params from url', (): void => {
    const expected: Params = {
      cool: 'beans',
      fancy: 'param',
      trueParam: true,
      falseParam: false,
      sentence: 'Im the map',
      number: 42
    }
    const result = queryParam()
    expect(result).to.deep.equal(expected)
  })
})

describe('queryParam does not break if no search in url', (): void => {
  before(() => {
    globalJsdom('', { url: 'https://patomation.com' })
  })
  it('it can get expected params from url', (): void => {
    const expected: Params = {}
    const result = queryParam()
    expect(result).to.deep.equal(expected)
  })
})

describe('localStorageQueryParam', () => {
  it('it can get param and store it', () => {
    globalJsdom('', { url: 'https://patomation.com?myParam=veryNice' })
    const expected: Params = { myParam: 'veryNice' }
    const result = localStorageQueryParam()
    expect(result).to.deep.equal(expected)
  })
  it('gets param that was stored earlier', () => {
    globalJsdom('', { url: 'https://patomation.com' })
    const expected: Params = { myParam: 'veryNice' }
    const result = localStorageQueryParam()
    expect(result).to.deep.equal(expected)
  })
  it('gets new param and stored param', () => {
    globalJsdom('', { url: 'https://patomation.com?newParam=cool' })
    const expected: Params = { myParam: 'veryNice', newParam: 'cool' }
    const result = localStorageQueryParam()
    expect(result).to.deep.equal(expected)
  })
})
