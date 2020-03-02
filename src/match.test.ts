import { match } from './match'

describe('match', () => {
  describe('given an exact path', () => {
    const path = '/messages/'

    describe('given a matching url', () => {
      const result = match(path, '/messages/')

      it('should return match', () => {
        expect(result).toHaveProperty('matches', true)
      })

      it('should not return any parameters', () => {
        expect(result).toHaveProperty('params', undefined)
      })
    })

    describe('given a non-matching url', () => {
      const result = match(path, '/not-found')

      it('should not return match', () => {
        expect(result).toHaveProperty('matches', false)
      })

      it('should not have any parameters', () => {
        expect(result).toHaveProperty('params', undefined)
      })
    })
  })

  describe('given a path with parameter', () => {
    const path = '/messages/:messageId'

    describe('given a matching url', () => {
      const result = match(path, '/messages/123-456')

      it('should return match', () => {
        expect(result).toHaveProperty('matches', true)
      })

      it('should return parameter "messageId"', () => {
        expect(result).toHaveProperty('params', { messageId: '123-456' })
      })
    })

    describe('given less than matching url', () => {
      const result = match(path, '/messages/')

      it('should not return match', () => {
        expect(result).toHaveProperty('matches', false)
      })

      it('should not have any parameters', () => {
        expect(result).toHaveProperty('params', undefined)
      })
    })

    describe('given more than matching url', () => {
      const result = match(path, '/messages/123/users')

      it('should not return match', () => {
        expect(result).toHaveProperty('matches', false)
      })

      it('should not have any parameters', () => {
        expect(result).toHaveProperty('params', undefined)
      })
    })

    describe('given non-matching url', () => {
      const result = match(path, '/not-found')

      it('should not return match', () => {
        expect(result).toHaveProperty('matches', false)
      })

      it('should not have any parameters', () => {
        expect(result).toHaveProperty('params', undefined)
      })
    })
  })

  describe('given a RegExp path', () => {
    describe('given a matching url', () => {
      const result = match(/\/users\//, '/users/')

      it('should return match', () => {
        expect(result).toHaveProperty('matches', true)
      })

      it('should not return any parameters', () => {
        expect(result).toHaveProperty('params', undefined)
      })
    })

    describe('given a matching url with wildcard', () => {
      const result = match(/\/user\/.+?\//, '/user/abcd-1234/')

      it('should return match', () => {
        expect(result).toHaveProperty('matches', true)
      })

      it('should not return any parameters', () => {
        expect(result).toHaveProperty('params', undefined)
      })
    })

    describe('given a non-matching url', () => {
      const result = match(/\/user\//, '/settings')

      it('should not return match', () => {
        expect(result).toHaveProperty('matches', false)
      })

      it('should not return any parameters', () => {
        expect(result).toHaveProperty('params', undefined)
      })
    })
  })
})
