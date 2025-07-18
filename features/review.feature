@smoke
Feature: Review Functionality

    Background:
        Given I am on the login page
        When I login with valid credentials
        When I select radio with value "admin"
        When I click on checkbox
        When I click on signIn


    Scenario: Add products to the cart and verify

        When I add all products to the cart
        When I click on checkout
        Then The total amount should be correct


    Scenario: Add product to the cart and verify
        When I add "iphone X" and "Nokia Edge" to the cart
        When I click on checkout
        Then The total amount should be correct


    Scenario: Remove product from the cart and verify
        When I add all products to the cart
        When I click on checkout
        When I click on continue shopping
        Then I should see the cart icon with 0 items

    Scenario: Complete purchase on confirm page
        When I add "iphone X" and "Nokia Edge" to the cart
        When I click on checkout
        When I click on checkout confirmpage
        When I enter "ind"


    Scenario Outline: Complete purchase on confirm page
        When I add "iphone X" and "Nokia Edge" to the cart
        When I click on checkout
        When I click on checkout confirmpage
        When I enter <country>
        When I select suggestion for <country>
        When I click on purchase
        Then I should see a message saying "Success! Thank you! Your order will be delivered in next few weeks :-)."


        Examples:
            | country                  |
            | ind                      |
            | United States of America |