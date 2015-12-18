const la = require('lazy-ass')
const is = require('check-more-types')
const find = require('./index')

/* global describe, it */
describe('find', () => {
  it('is a function', () => {
    la(is.fn(find))
  })

  it('searches through commits', () => {
    return find(3)
      .then((tag) => {
        la(is.maybe.unemptyString(tag), 'invalid tag', tag)
      })
  })
})
