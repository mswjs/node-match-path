import { parse } from './parse'

it('parses', () => {
  parse('https://api.site.com/user/:id/:role?')
})
