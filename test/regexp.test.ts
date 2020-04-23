import { runner } from './setup/runner'

runner('RegExp', [
  {
    given: /\/users\//,
    when: [
      {
        actual: '/users/',
        it: {
          matches: true,
          params: null,
        },
      },
      {
        actual: '/users/abcd-1234/',
        it: {
          matches: true,
          params: null,
        },
      },
      {
        actual: '/settings',
        it: {
          matches: false,
          params: null,
        },
      },
    ],
  },
  {
    given: /\/user\/.+?\//,
    when: [
      {
        actual: '/user/abcd-1234/',
        it: {
          matches: true,
          params: null,
        },
      },
      {
        actual: '/user/',
        it: {
          matches: false,
          params: null,
        },
      },
    ],
  },
])
