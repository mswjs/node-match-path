/**
 * Converts a string path to regular expression.
 * Transforms path parameters into named RegExp groups.
 */
export default function pathToRegExp(path: string): RegExp {
  const pattern = path
    .replace(/\/+/g, '/')
    .replace('*', '.+?')
    .replace(/:(\w+(?=\/|$))/g, (_, match) => `(?<${match}>.+?(?=\/|$))`)
  // .concat('$')

  return new RegExp(pattern, 'g')
}
