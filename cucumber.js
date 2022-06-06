const options = [
  '--require-module ts-node/register',
  '--require specification/support/*.ts',
  '--publish-quiet',
]

module.exports = {
  default: [
    'node_modules/@universal-path/specification/features/**/*.feature',
    ...options,
  ].join(' '),
  only: options.join(' '),
}
