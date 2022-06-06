import { ParameterToken, Token } from './parse'

const log = require('debug')('to-reg-exp')

function normalizeString(str: string): string {
  return (
    str
      // Escape literal dots.
      .replace(/\./g, '\\.')
      // Escape wildcard with a matching group.
      .replace(/\*+/, '.*')
  )
}

function compileParameter(token: ParameterToken): string {
  switch (token.modifier) {
    // Optional parameter.
    case '?': {
      return `(?<${token.name}>[^\/#\?]+?)?`
    }

    // Zero-or-more parameter;
    case '*': {
      return `(?<${token.name}>(?:[^\/#\?]+?)(?:\/(?:[^\/#\?]+?))*)?`
    }

    // One-or-more parameter.
    case '+': {
      return `(?<${token.name}>(?:[^\/#\?]+?)(?:\/(?:[^\/#\?]+?))*)`
    }

    default: {
      return `(?<${token.name}>[^\/#\?]+?)`
    }
  }
}

export function toRegExp(tokens: Token[]): RegExp {
  let expression = ''
  log('tokens', tokens)

  for (const token of tokens) {
    log('reading token', token)
    const delimiter = token.delimiter || ''
    log('using delimited', delimiter)

    switch (token.type) {
      case 'string': {
        log('token is a string...')
        expression += normalizeString(token.value) + delimiter
        log('next expression', expression)
        break
      }

      case 'parameter': {
        log('token is a parameter, compiling...')

        const parameterExp = compileParameter(token)
        log('compiled parameter', parameterExp)

        expression += parameterExp + delimiter
        log('next expression', expression)
        break
      }
    }
  }

  const result = new RegExp(`^${expression}[\/#\?]?$`, 'i')
  log('result', result)

  return result
}
