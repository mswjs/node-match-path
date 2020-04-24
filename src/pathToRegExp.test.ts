import { pathToRegExp } from './pathToRegExp'

describe('pathToRegExp', () => {
  describe('given a plain string path', () => {
    it('should transform into expression matching the string', () => {
      const exp = pathToRegExp('/users/recent')
      expect(exp).toEqual(/\/users\/recent(\/|$)/g)
    })
  })

  describe('given a path with parameters', () => {
    it('should replace parameters with a group', () => {
      const exp = pathToRegExp('/user/:userId/')
      expect(exp).toEqual(/\/user\/(?<userId>.+?)(\/|$)/g)
    })
  })

  describe('given a path with a wildcard', () => {
    it('should handle wildcard', () => {
      const exp = pathToRegExp('/user/*/shipping')
      expect(exp).toEqual(/\/user\/.+\/shipping(\/|$)/g)
    })
  })

  describe('given a path with parameter and wildcard', () => {
    it('should handle both', () => {
      const exp = pathToRegExp('/user/:userId/*')
      expect(exp).toEqual(/\/user\/(?<userId>.+?)\/.+(\/|$)/g)
    })
  })

  describe('given a full url', () => {
    it('should escape the url characters', () => {
      const exp = pathToRegExp('https://api.github.com/users/:username')
      expect(exp).toEqual(
        /https:\/\/api\.github\.com\/users\/(?<username>.+?)(\/|$)/g,
      )
    })
  })

  describe('given a url with a port', () => {
    it('should leave port number as-is', () => {
      const exp = pathToRegExp('http://localhost:4000')
      expect(exp).toEqual(/http:\/\/localhost:4000(\/|$)/g)
    })
  })

  describe('given a string with a question mark', () => {
    it('should escape the question mark', () => {
      const exp = pathToRegExp('http://test.msw.io/api/books?id=123')
      expect(exp).toEqual(/http:\/\/test\.msw\.io\/api\/books\?id=123(\/|$)/g)
    })
  })
})
