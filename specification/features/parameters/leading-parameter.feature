Feature: Leading path parameter

  # Scenario: All-capturing parameter
  #   Given the path is ":service"
  #   When the url is "/user/1/messages"
  #   Then it matches
  #   And has the "service" parameter equal to "/user/1/messages"

  Scenario: Single leading parameter
    Given the path is ":service/user"
    When the url is "payments/user"
    Then it matches
    And has the "service" parameter equal to "payments"

    When the url is "payments/user/abc-123"
    Then it doesn't match

    When the url is "payments/session/user"
    Then it doesn't match

  Scenario: Multiple leading parameters
    Given the path is ":service/:session/user"
    When the url is "payments/abc-123/user"
    Then it matches
    And has the "service" parameter equal to "payments"
    And has the "session" parameter equal to "abc-123"

    When the url is "payments/user"
    Then it doesn't match

    When the url is "payments/abc-123/user/messages"
    Then it doesn't match
