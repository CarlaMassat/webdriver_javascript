@smoke
Feature: Cart Functionality

 Background:
    Given I am on the login page
    When I login with valid credentials
    When I select radio with value "admin"
    When I click on checkbox
    When I click on signIn
    

Scenario: Display all cards
    Then I should see checkout button
    Then I should see all cards displayed

Scenario: Add products to the cart
    When I add products to the cart

Scenario: Add products to the cart and verify
    When I add all products to the cart
    Then I should see the cart icon with the correct item count
 
    

Scenario: Add product to the cart and verify
    When I add "iphone X" and "Nokia Edge" to the cart
    Then I should see the cart icon with the correct item count