const SEGMENT_EXP = /(?<![:\/])\//g
const PARAM_EXP = /^:([\w_-]+)(\?|\*|\+)?$/

export interface TokenType<Type extends string> {
  type: Type
  delimiter?: '/'
}

export interface StringToken extends TokenType<'string'> {
  value: string
}

export interface ParameterToken extends TokenType<'parameter'> {
  name: string
  modifier: string
}

export type Token = StringToken | ParameterToken

export function parse(path: string): Token[] {
  const segments = path.split(SEGMENT_EXP)
  const tokens = segments.map<Token>((segment, index) => {
    const isLastToken = index === segments.length - 1
    const delimiter = isLastToken ? undefined : '/'

    const paramMatch = segment.match(PARAM_EXP)
    if (paramMatch) {
      const [, name, modifier] = paramMatch
      return {
        type: 'parameter',
        name,
        modifier,
        delimiter,
      }
    }

    return {
      type: 'string',
      value: segment,
      delimiter,
    }
  })

  return tokens
}
