import { runner } from './setup/runner'

runner('Path', [
  /**
   * Path parameter
   */
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
    given: '/user/:userId/messages/:messageId',
    when: [
      {
        actual: '/user/abc-123/messages/def-456',
        it: {
          matches: true,
          params: {
            userId: 'abc-123',
            messageId: 'def-456',
          },
        },
      },
      {
        actual: '/user/abc-123/messages/def-456/',
        it: {
          matches: true,
          params: {
            userId: 'abc-123',
            messageId: 'def-456',
          },
        },
      },
      {
        actual: '/user/abc-123/messages/def-456/arbitrary',
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
        actual: '/user/abc-123',
        it: {
          matches: false,
          params: null,
        },
      },
    ],
  },
  {
    given: '/user/:u',
    when: [
      {
        actual: '/user/abc-123',
        it: {
          matches: true,
          params: {
            u: 'abc-123',
          },
        },
      },
      {
        actual: '/user/abc-123/',
        it: {
          matches: true,
          params: {
            u: 'abc-123',
          },
        },
      },
      {
        actual: '/user/abc-123/arbitrary',
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
  {
    given: '/files/:filename.json',
    when: [
      {
        actual: '/files/report.json',
        it: {
          matches: true,
          params: {
            filename: 'report',
          },
        },
      },
      {
        actual: '/files/long-report-name-2.json',
        it: {
          matches: true,
          params: {
            filename: 'long-report-name-2',
          },
        },
      },
      {
        actual: '/files/:filename',
        it: {
          matches: false,
          params: null,
        },
      },
    ],
  },

  /**
   * Wildcard
   */
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
  {
    given: '/user/*/messages/*',
    when: [
      {
        actual: '/user/any/messages/abc-123',
        it: {
          matches: true,
          params: null,
        },
      },
      {
        actual: '/user/any/messages/any/more',
        it: {
          matches: true,
          params: null,
        },
      },
      {
        actual: '/user/any/',
        it: {
          matches: false,
          params: null,
        },
      },
    ],
  },

  /**
   * Parameter and wildcard
   */
  {
    given: '/user/:userId/*',
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
        actual: '/User/abc-123/messages',
        it: {
          matches: true,
          params: {
            userId: 'abc-123',
          },
        },
      },
      {
        actual: '/user/abc-123/settings/',
        it: {
          matches: true,
          params: {
            userId: 'abc-123',
          },
        },
      },
      {
        actual: '/user/abc-123/messages/def-456',
        it: {
          matches: true,
          params: {
            userId: 'abc-123',
          },
        },
      },
      {
        actual: '/user/abc-123',
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
