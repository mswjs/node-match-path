import { runner } from './setup/runner'

runner('URL', [
  {
    given: '/users',
    when: [
      {
        actual: '/users',
        it: {
          matches: true,
          params: null,
        },
      },
      {
        actual: '/users/',
        it: {
          matches: true,
          params: null,
        },
      },
      {
        actual: '/users/arbitrary',
        it: {
          matches: false,
          params: null,
        },
      },
      {
        actual: '/arbitrary/users',
        it: {
          matches: false,
          params: null,
        },
      },
      {
        actual: '/use',
        it: {
          matches: false,
          params: null,
        },
      },
    ],
  },
  {
    given: 'https://test.mockserviceworker.io',
    when: [
      {
        actual: 'https://test.mockserviceworker.io',
        it: {
          matches: true,
          params: null,
        },
      },
      {
        actual: 'https://test.mockserviceworker.io/',
        it: {
          matches: true,
          params: null,
        },
      },
    ],
  },
  {
    given: 'https://test.mockserviceworker.io/',
    when: [
      {
        actual: 'https://test.mockserviceworker.io',
        it: {
          matches: true,
          params: null,
        },
      },
      {
        actual: 'https://test.mockserviceworker.io/',
        it: {
          matches: true,
          params: null,
        },
      },
    ],
  },
])
