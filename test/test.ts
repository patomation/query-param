import 'mocha'
import { expect } from 'chai'
import { Params, queryParam } from '../src/index'
// Emulate global dom
import globalJsdom from 'jsdom-global'

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


