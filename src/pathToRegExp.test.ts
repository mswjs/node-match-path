import pathToRegExp from './pathToRegExp'

describe('pathToRegExp', () => {
  describe('given a plain string path', () => {
    it('should transform into expression matching the string', () => {
      const exp = pathToRegExp('/users/recent')
      expect(exp).toEqual(/\/users\/recent/g)
    })
  })

  describe('given a path with parameters', () => {
    it('should replace parameters with a group', () => {
      const exp = pathToRegExp('/user/:userId/')
      expect(exp).toEqual(/\/user\/(?<userId>.+?(?=\/|$))\//g)
    })
  })

  describe('given a path with a wildcard', () => {
    it('should handle wildcard', () => {
      const exp = pathToRegExp('/user/*/shipment')
      expect(exp).toEqual(/\/user\/.+?\/shipment/g)
    })
  })
})
