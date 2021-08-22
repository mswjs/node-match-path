import { parse } from './parse'
import { toRegExp } from './toRegExp'

it('supports relative path literals', () => {
  expect(toRegExp(parse('/user'))).toEqual(/^\/user[/#?]?$/i)
})

it('supports absolute path literals', () => {
  expect(toRegExp(parse('https://api.github.com/graphql'))).toEqual(
    /^https:\/\/api\.github\.com\/graphql[/#?]?$/i,
  )
})

it('supports parentheses', () => {
  expect(toRegExp(parse(`/user\\('id'\\)`))).toEqual(/^\/user\('id'\)[/#?]?$/i)
})

it('supports standalone path parameters', () => {
  expect(toRegExp(parse('/:id'))).toEqual(/^\/(?<id>[^/#?]+?)[/#?]?$/i)
})

it('supports leading path parameters', () => {
  expect(toRegExp(parse('/:service/user'))).toEqual(
    /^\/(?<service>[^/#?]+?)\/user[/#?]?$/i,
  )
})

it('supports trailing path parameters', () => {
  expect(toRegExp(parse('/user/:id'))).toEqual(
    /^\/user\/(?<id>[^/#?]+?)[/#?]?$/i,
  )
})

it('supports in-string path parameters', () => {
  expect(toRegExp(parse('/user/:id/messages'))).toEqual(
    /^\/user\/(?<id>[^/#?]+?)\/messages[/#?]?$/i,
  )
})

it('supports optional path parameters', () => {
  expect(toRegExp(parse('/:id?'))).toEqual(/^\/(?<id>[^/#?]+?)?[/#?]?$/i)
})

it('supports zero-or-more path parameters', () => {
  expect(toRegExp(parse('/:id*'))).toEqual(
    /^\/(?<id>(?:[^/#?]+?)(?:\/(?:[^/#?]+?))*)?[/#?]?$/i,
  )
})

it('supports one-or-more path parameters', () => {
  expect(toRegExp(parse('/:id+'))).toEqual(
    /^\/(?<id>(?:[^/#?]+?)(?:\/(?:[^/#?]+?))*)[/#?]?$/i,
  )
})

it('supports wildcards', () => {
  expect(toRegExp(parse('*'))).toEqual(/^.*[/#?]?$/i)
})
