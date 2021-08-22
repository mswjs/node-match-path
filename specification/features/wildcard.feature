Feature: Path wildcard

  Scenario: Standalone wildcard
    Given the path is "*"
    When the url is "/user"
    Then it matches
    But has no parameters

    When the url is "/user/messages"
    Then it matches
    But has no parameters

  Scenario: Leading wildcard
    Given the path is "*/user"
    When the url is "payments/user"
    Then it matches
    But has no parameters

    When the url is "payments/recent/user"
    Then it matches
    But has no parameters

  Scenario: Trailing wildcard
    Given the path is "/user/*"
    When the url is "/user/"
    Then it matches
    But has no parameters

    When the url is "/user/messages"
    Then it matches
    But has no parameters

    When the url is "/user/messages/1"
    Then it matches
    But has no parameters
    
    When the url is "/user"
    Then it doesn't match

  Scenario: In-between wildcard
    Given the path is "/user/*/messages"
    When the url is "/user/1/messages"
    Then it matches
    But has no parameters

    When the url is "/user/one/two/messages"
    Then it matches
    But has no parameters

    When the url is "/user/messages"
    Then it doesn't match
