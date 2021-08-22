Feature: One-or-more (+) path parameter
x
  Background:
    Given the path is "/:service+"

  Scenario: Single matching segment
    When the url is "/payments"
    Then it matches
    And has the "service" parameter equal to "payments"

    When the url is "/payments/"
    Then it matches
    And has the "service" parameter equal to "payments"

  Scenario: Multiple matching segments
    When the url is "/payments/recent"
    Then it matches
    And has the "service" parameter equal to "payments, recent"

    When the url is "/payments/recent/"
    Then it matches
    And has the "service" parameter equal to "payments, recent"

  Scenario: No matching segments
    When the url is "/"
    Then it doesn't match
