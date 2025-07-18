@smoke
Feature: Login Functionality

  Background:
    Given I am on the login page

  Scenario: Login with valid credentials and Admin user
    When I login with valid credentials
    When I select radio with value "admin"
    When I click on checkbox
    When I click on signIn


  Scenario: Login with valid credentials and User
    When I login with valid credentials
    When I select radio with value "user"
    Then I should see the modal
    When I confirm modal
    When I click on signIn

  Scenario: Login with invalid credentials
    When I login with invalid credentials


  Scenario: Cancel login User
    When I login with valid credentials
    When I select radio with value "user"
    Then I should see the modal
    When I cancel the modal

  Scenario: Select Student value from dropdown
    When I login with valid credentials
    When I select a value on dropdown "stud"

  Scenario: Select Teacher value from dropdown
    When I login with valid credentials
    When I select a value on dropdown "teach"

  Scenario: Select Consultant value from dropdown
    When I login with valid credentials
    When I select a value on dropdown "consult"


  Scenario Outline: Login with multiple username/password combinations
    When I login with "<username>" and "<password>"
    When I click on signIn
    Then I should see an error message "<message>"

    Examples:
      | username | password             | message                      |
      | tomsmith | SuperSecretPassword! | Incorrect username/password. |
      | foobar   | barfoo               | Incorrect username/password. |


  Scenario Outline: Login with empty credentials
    When I click on signIn
    Then I should see an error message "<message>"


    Examples:
      | username | password | message                  |
      |          |          | Empty username/password. |