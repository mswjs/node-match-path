const options = [
  '--require-module ts-node/register',
  '--require specification/support/*.ts',
  '--publish-quiet',
]

module.exports = {
  default: ['./specification/**/*.feature', ...options].join(' '),
  only: options.join(' '),
}
