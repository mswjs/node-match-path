import { watch } from 'chokidar'
import { spawnSync } from 'child_process'

const runTests = (filePath: string) => {
  console.clear()
  spawnSync(
    'cucumber-js',
    [
      filePath,
      '--require-module=ts-node/register',
      '--require=specification/support/*.ts',
      '--publish-quiet',
    ],
    {
      stdio: 'inherit',
    },
  )
}

watch('specification/**/*.feature')
  .on('add', runTests)
  .on('change', runTests)
  .on('unlink', runTests)
