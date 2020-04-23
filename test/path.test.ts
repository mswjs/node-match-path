import { runner } from './setup/runner'

runner('Path', [
  {
    given: '/user/:userId',
    when: [
      {
        actual: '/user/abc-123',
        it: {
          matches: true,
          params: { userId: 'abc-123' },
        },
      },
      {
        actual: '/user/abc-123/',
        it: {
          matches: true,
          params: { userId: 'abc-123' },
        },
      },
      {
        actual: '/user/',
        it: {
          matches: false,
          params: null,
        },
      },
      {
        actual: '/user/abc-123/messages',
        it: {
          matches: false,
          params: null,
        },
      },
      {
        actual: '/arbitrary/abc-123',
        it: {
          matches: false,
          params: null,
        },
      },
    ],
  },
  {
    given: '/user/:userId/messages',
    when: [
      {
        actual: '/user/abc-123/messages',
        it: {
          matches: true,
          params: {
            userId: 'abc-123',
          },
        },
      },
      {
        actual: '/user/abc-123/messages/arbitrary',
        it: {
          matches: false,
          params: null,
        },
      },
      {
        actual: '/user/abc-123/',
        it: {
          matches: false,
          params: null,
        },
      },
    ],
  },
  {
    given: '/user/*/messages',
    when: [
      {
        actual: '/user/arbitrary/messages',
        it: {
          matches: true,
          params: null,
        },
      },
      {
        actual: '/user/arbitrary/messages/more',
        it: {
          matches: false,
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
