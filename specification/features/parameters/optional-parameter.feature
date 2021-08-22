Feature: Optional (?) path parameter

  Scenario: Matching segment
    Given the path is "/:id?"
    When the url is "/abc-123"
    Then it matches
    And has the "id" parameter equal to "abc-123"

  Scenario: No matching segments
    Given the path is "/:id?"
    When the url is "/"
    Then it matches
    But has no parameters

  Scenario: Matching segment for a leading parameter
    Given the path is "/:id?/user"
    When the url is "/abc-123/user"
    Then it matches
    And has the "id" parameter equal to "abc-123"

    When the url is "/abc-123/user/"
    Then it matches
    And has the "id" parameter equal to "abc-123"

  Scenario: No matching segments for a leading parameter
    Given the path is "/:id?/user"
    When the url is "/user"
    Then it doesn't match

    When the url is "/user/"
    Then it doesn't match

  Scenario: Matching segment for a trailing parameter
    Given the path is "/user/:id?"
    When the url is "/user/1"
    Then it matches
    And has the "id" parameter equal to "1"

    When the url is "/user/1/"
    Then it matches
    And has the "id" parameter equal to "1"

  Scenario: No matching segments for a trailing parameter
    Given the path is "/user/:id?"
    When the url is "/user/"
    Then it matches
    But has no parameters
