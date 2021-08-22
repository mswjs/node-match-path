Feature: Relative URL

  Background: Background name
    Given the path is "/user"

  Scenario: Exact matching url
    When the url is "/user"
    Then it matches
    But has no parameters

  Scenario: Matching url with a trailing slash
    When the url is "/user/"
    Then it matches
    But has no parameters

  Scenario: Matching url with a hash
    When the url is "/user#"
    Then it matches
    But has no parameters

  Scenario: Entirely different url
    When the url is "/about"
    Then it doesn't match

  Scenario: The same path with a prefix
    When the url is "/m/user"
    Then it doesn't match
