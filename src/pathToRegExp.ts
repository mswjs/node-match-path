/**
 * Converts a string path to regular expression.
 * Transforms path parameters into named RegExp groups.
 */
export const pathToRegExp = (path: string): RegExp => {
  const pattern = path
    .replace(/\/+/g, '/')
    .replace('*', '.+?')
    .replace(/:(\w+(?=\/|$))/g, (_, match) => `(?<${match}>.+?(?=\/|$))`)

  return new RegExp(pattern, 'g')
}
