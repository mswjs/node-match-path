/**
 * Converts a string path to a Regular Expression.
 * Transforms path parameters into named RegExp groups.
 */
export const pathToRegExp = (path: string): RegExp => {
  const pattern = path
    // Escape literal dots
    .replace(/\./g, '\\.')
    // Escape literal slashes
    .replace(/\//g, '/')
    // Ignore trailing slashes
    .replace(/\/+$/, '')
    .replace('*', '.+?')
    .replace(/:([^\d]\w+(?=\/|$))/g, (_, match) => `(?<${match}>.+?(?=\/|$))`)
    .concat('\\/?')

  return new RegExp(pattern, 'g')
}
