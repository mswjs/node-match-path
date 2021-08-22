import { parse } from './parse'
import { toRegExp } from './toRegExp'

const log = require('debug')('match')

export type Path = RegExp | string
export type Params = Record<string, string | string[]>

export interface Match {
  matches: boolean
  params: Record<string, string>
}

/**
 * Matches a given url against a path.
 */
export const match = (path: Path, url: string): Match => {
  log('matching "%s" adainst "%s"...', path, url)

  const expression = path instanceof RegExp ? path : toRegExp(parse(path))
  log('using expression', expression)

  const match = expression.exec(url) || false
  log('match result', match)

  // Matches in strict mode: match string should equal to input (url)
  // Otherwise loose matches will be considered truthy:
  // match('/messages/:id', '/messages/123/users') // true
  const matches =
    path instanceof RegExp ? !!match : !!match && match[0] === match.input

  let params = {}

  if (matches && match) {
    params = Object.entries(match.groups || {}).reduce<Params>(
      (params, [name, value]) => {
        if (typeof value !== 'undefined') {
          params[name] = value.includes('/') ? value.split('/') : value
        }
        return params
      },
      {},
    )
  }

  log('parameters', params)

  return {
    matches,
    params,
  }
}
