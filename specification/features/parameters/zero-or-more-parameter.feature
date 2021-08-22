Feature: Zero-or-more (*) path parameter

  Background:
    Given the path is "/:id*"

  Scenario: No matching segments
    When the url is "/"
    Then it matches
    But has no parameters

  Scenario: Single matching segment
    When the url is "/abc-123"
    Then it matches
    And has the "id" parameter equal to "abc-123"

  Scenario: Multiple matching segments
    When the url is "/1/abc/123"
    Then it matches
    And has the "id" parameter equal to "1, abc, 123"
