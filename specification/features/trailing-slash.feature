Feature: Trailing slash

  Scenario: Optional trailing slash
    Given the path is "/user"
    When the url is "/user/"
    Then it matches
    But has no parameters

  Scenario: Multiple trailing slashes
    Given the path is "/user"
    When the url is "/user//"
    Then it doesn't match
