Feature: Special characters in the URL

  Scenario: Parentheses
    Given the path is "/user\('id'\)"
    When the url is "/user('id')"
    Then it matches
    But has no parameters
