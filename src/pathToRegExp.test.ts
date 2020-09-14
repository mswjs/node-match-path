import { pathToRegExp } from './pathToRegExp'

describe('pathToRegExp', () => {
  describe('given a plain string path', () => {
    it('should transform into expression matching the string', () => {
      const exp = pathToRegExp('/users/recent')
      expect(exp).toEqual(/\/users\/recent(\/|$)/gi)
    })
  })

  describe('given a path with parameters', () => {
    it('should replace parameters with a group', () => {
      const exp = pathToRegExp('/user/:userId/')
      expect(exp).toEqual(/\/user\/(?<userId>.+?)(\/|$)/gi)
    })
  })

  describe('given a path with a one-character parameter', () => {
    it('should replace parameter with a group', () => {
      const exp = pathToRegExp('/user/:u')
      expect(exp).toEqual(/\/user\/(?<u>.+?)(\/|$)/gi)
    })
  })

  describe('given a path with multiple parameters', () => {
    it('should replace each parameter with a group', () => {
      expect(pathToRegExp('/user/:userId/messages/:messageId')).toEqual(
        /\/user\/(?<userId>.+?)\/messages\/(?<messageId>.+?)(\/|$)/gi,
      )
    })
  })

  describe('given a path with a wildcard', () => {
    it('should handle wildcard', () => {
      const exp = pathToRegExp('/user/*/shipping')
      expect(exp).toEqual(/\/user\/.+\/shipping(\/|$)/gi)
    })
  })

  describe('given a path with parameter and wildcard', () => {
    it('should handle both', () => {
      const exp = pathToRegExp('/user/:userId/*')
      expect(exp).toEqual(/\/user\/(?<userId>.+?)\/.+(\/|$)/gi)
    })
  })

  describe('given a full url', () => {
    it('should escape the url characters', () => {
      const exp = pathToRegExp('https://api.github.com/users/:username')
      expect(exp).toEqual(
        /https:\/\/api\.github\.com\/users\/(?<username>.+?)(\/|$)/gi,
      )
    })
  })

  describe('given a url with a port', () => {
    it('should leave port number as-is', () => {
      const exp = pathToRegExp('http://localhost:4000')
      expect(exp).toEqual(/http:\/\/localhost:4000(\/|$)/gi)
    })
  })

  describe('given a string with a question mark', () => {
    it('should escape the question mark', () => {
      const exp = pathToRegExp('http://test.msw.io/api/books?id=123')
      expect(exp).toEqual(/http:\/\/test\.msw\.io\/api\/books\?id=123(\/|$)/gi)
    })
  })

  describe('given a path with a parameter and extension', () => {
    it('should properly parse the parameter', () => {
      const exp = pathToRegExp('/user/:userId.json')
      expect(exp).toEqual(/\/user\/(?<userId>.+?)\.json(\/|$)/gi)
    })
  })
})
