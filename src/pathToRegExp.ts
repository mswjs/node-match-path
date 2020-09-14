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
    // Escape literal question marks
    .replace(/\?/g, '\\?')
    // Ignore trailing slashes
    .replace(/\/+$/, '')
    // Replace wildcard with any single character sequence
    .replace(/\*+/g, '.+')
    // Replace parameters with named capturing groups
    .replace(
      /:([^\d|^\/][a-zA-Z0-9]*(?=(?:\/|\\.)|$))/g,
      (_, match) => `(?<${match}>.+?)`,
    )
    // Allow optional trailing slash
    .concat('(\\/|$)')

  return new RegExp(pattern, 'gi')
}
