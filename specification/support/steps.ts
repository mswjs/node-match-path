import { expect } from 'chai'
import { Given, When, Then } from '@cucumber/cucumber'

Given('the path is {string}', function (path: string) {
  this.path = path
})

When('the url is {string}', function (url: string) {
  this.url = url
  this.match(this.path, this.url)
})

Then('it matches', function () {
  expect(this.result).to.have.property('matches', true)
})

Then(`it doesn't match`, function () {
  expect(this.result).to.have.property('matches', false)
  expect(this.result).to.have.deep.property('params', {})
})

Then('has no parameters', function () {
  expect(this.result.params).to.deep.equal({})
})

Then(
  'has the {string} parameter equal to {string}',
  function (parameterName: string, value: string) {
    expect(this.result.params).not.to.be.null

    const normalizedValue = value.includes(',')
      ? value.split(',').map((s) => s.trim())
      : value
    expect(this.result.params).to.have.deep.property(
      parameterName,
      normalizedValue,
    )
  },
)
