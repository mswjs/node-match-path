Feature: Absolute URL

  Background:
    Given the path is "https://api.github.com/graphql"

  Scenario: Exact matching url
    When the url is "https://api.github.com/graphql"
    Then it matches
    But has no parameters

  Scenario: Matching url with a trailing slash
    When the url is "https://api.github.com/graphql/"
    Then it matches
    But has no parameters

  Scenario: Matching url with a hash
    When the url is "https://api.github.com/graphql"
    Then it matches
    But has no parameters

  Scenario: Entirely different url
    When the url is "https://graphql.com"
    Then it doesn't match

  Scenario: The same url with a nested path
    When the url is "https://api.github.com/graphql/query"
    Then it doesn't match

  Scenario: The same path with a different hostname
    When the url is "https://arbitrary.com/graphql"
    Then it doesn't match

  Scenario: Matching url with a different protocol
    When the url is "http://api.github.com/graphql"
    Then it doesn't match
    
    When the url is "chrome-extension://api.github.com/graphql"
    Then it doesn't match