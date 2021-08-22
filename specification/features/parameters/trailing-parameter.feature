Feature: Trailing path parameters

  Scenario: Single trailing parameter
    Given the path is "/user/:id"
    When the url is "/user/1"
    Then it matches
    And has the "id" parameter equal to "1"

  Scenario: Multiple trailing parameters
    Given the path is "/user/:id/:messageId"
    When the url is "/user/abc-123/1"
    Then it matches
    And has the "id" parameter equal to "abc-123"
    And has the "messageId" parameter equal to "1"
