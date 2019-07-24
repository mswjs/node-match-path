# `node-match-path`

Matches a URL against the given path string.

## Getting started

### Install

```bash
npm install node-match-path
```

### Usage

```js
const { match } = require('node-match-path')

match('/user/:userId', '/user/5')
```

## API

### `match(path: string, url: string): Match`

Returns a match data, if any, between a url and a path.

#### Plain string path

```js
match('/admin', '/admin')

{
  matches: true,
  params: null
}
```

#### Path with parameters

```js
match('/admin/:messageId', '/admin/sh3fe')

{
  matches: true,
  params: {
    messageId: 'sh3fe'
  }
}
```

#### Path with wildcard

```js
match('/messages/*/participants', '/messages/2/participants')

{
  matches: true,
  params: null
}
```

## Honorable mentions

- [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp)
