import match from './match'

describe('match', () => {
  describe('given an exact path', () => {
    const path = '/messages/'

    describe('given a matching url', () => {
      const result = match(path, '/messages/')

      it('should match', () => {
        expect(result).toHaveProperty('matches', true)
      })

      it('should have no parameters', () => {
        expect(result).toHaveProperty('params', undefined)
      })
    })

    describe('given a non-matching url', () => {
      const result = match(path, '/not-found')

      it('should not match', () => {
        expect(result).toHaveProperty('matches', false)
      })

      it('should have no parameters', () => {
        expect(result).toHaveProperty('params', undefined)
      })
    })
  })

  describe('given a path with parameter', () => {
    const path = '/messages/:messageId'

    describe('given a matching url', () => {
      const result = match(path, '/messages/123-456')

      it('should match', () => {
        expect(result).toHaveProperty('matches', true)
      })

      it('should have parameter "messageId"', () => {
        expect(result).toHaveProperty('params', { messageId: '123-456' })
      })
    })

    describe('given less than matching url', () => {
      const result = match(path, '/messages/')

      it('should not match', () => {
        expect(result).toHaveProperty('matches', false)
      })

      it('should have no parameters', () => {
        expect(result).toHaveProperty('params', undefined)
      })
    })

    describe('given more than matching url', () => {
      const result = match(path, '/messages/123/users')

      it('should not match', () => {
        expect(result).toHaveProperty('matches', false)
      })

      it('should have no parameters', () => {
        expect(result).toHaveProperty('params', undefined)
      })
    })

    describe('given non-matching url', () => {
      const result = match(path, '/not-found')

      it('should not match', () => {
        expect(result).toHaveProperty('matches', false)
      })

      it('should have no parameters', () => {
        expect(result).toHaveProperty('params', undefined)
      })
    })
  })
})
