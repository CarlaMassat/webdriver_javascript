import dotenv from "dotenv";
dotenv.config();

import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect, browser } from "@wdio/globals";

import LoginPage from "../pageobjects/login.page.js";
import Cart from "../pageobjects/cart.js";
import Review from "../pageobjects/reviewPage.js";
import uiControls from "../pageobjects/uiControls.js";
import Confirm from "../pageobjects/confirm.js";

import users from "../testData/LoginTest.json" assert { type: "json" };
import products from "../testData/e2eTest.json" assert { type: "json" };


const pages = {
  login: LoginPage,
  cart: Cart,
  review: Review,
  confirm: Confirm,
};


const { APP_VALID_USERNAME: validUsername, APP_VALID_PASSWORD: validPassword } =
  process.env;

Given(/^I am on the (\w+) page$/, async (page) => {
  await pages[page].open();
 
});

When(/^I login with valid credentials$/, async () => {
  await LoginPage.login(validUsername, validPassword);
});

When(/^I login with invalid credentials$/, async () => {
  for (const user of users) {
    await LoginPage.login(user.username, user.password);
    await uiControls.submit();
    const errorText = await LoginPage.errorText();
    expect(errorText).toContain("Incorrect username/password.");
    await LoginPage.signUsername.clearValue();
    await LoginPage.signPassword.clearValue();
  }
});

When(/^I login with "([^"]*)" and "([^"]*)"$/, async (username, password) => {
  await LoginPage.login(username, password);
});

When(/^I select radio with value "(.*)"$/, async (option) => {
  await uiControls.clickRadio(option);
});

When(/^I confirm modal$/, async () => {
  await uiControls.modal();
});

When(/^I cancel the modal$/, async () => {
  await uiControls.modalCancel();
});

When(/^I click on signIn$/, async () => {
  await uiControls.submit();
});

When(/^I click on checkbox$/, async () => {
  await uiControls.checkCondition();
});

When(/^I select a value on dropdown "(.*)"$/, async (value) => {
  await uiControls.clickDropdown();
  await uiControls.dropdown.selectByAttribute("value", value);
});



When(/^I add products to the cart$/, async () => {
  for (const item of products) { 
    for (const product of item.products) {
      await Cart.addProduct(product);

    }
  }
});


When("I add all products to the cart", async () => {
  await Cart.addAllProducts();
});



When(
  /^I add "(.*)" and "(.*)" to the cart$/,
  async (productName1, productName2) => {
    await Cart.addProduct(productName1);
    await Cart.addProduct(productName2);
  }
);

When(/^I click on checkout$/, async () => {
  await Cart.checkout();
  await expect(browser).toHaveTitle("ProtoCommerce");
});

When(/^I click on continue shopping$/, async () => {
  await expect(Review.continueShopping).toHaveText("Continue Shopping");
  await Review.continueShopping.click();
});

When(/^I click on checkout confirmpage$/, async () => {
  await Confirm.checkout.click();
  await Confirm.purchase.waitForDisplayed({timeout:5000})

});

When(/^I enter (.+)$/, async (country) => {
  await Confirm.country.waitForDisplayed({ timeout: 5000 });
  await Confirm.setCountry(country);
  await Confirm.termCondition.click();
});

When(/^I select suggestion for (.+)$/, async (country) => {
  await Confirm.setSuggestion(country);
  await Confirm.suggestions.click();

});

When(/^I click on purchase$/, async () => {
  await Confirm.purchase.click();
 
});


Then(/^I should see the modal$/, async () => {
  await expect(uiControls.modalContent).toBeDisplayed();
});

Then(/^I should see an error message "(.+)"$/, async (expectedMessage) => {
  const actualMessage = await LoginPage.errorText();
  expect(actualMessage).toContain(expectedMessage);
});

Then(/^I should see checkout button$/, async () => {
  await Cart.checkout();
});

Then(/^I should see all cards displayed$/, async () => {
  await Cart.getCards();
});

Then("The total amount should be correct", async () => {
  const prices = await Review.getProductPrices();
  const expectedTotal = prices.reduce((acc, price) => acc + price, 0);

  const displayedTotal = await Review.getDisplayedTotal();

  console.log(`Suma productos: ${expectedTotal}`);
  console.log(`Total productos: ${displayedTotal}`);
});

Then(
  /^I should see the cart icon with the correct item count$/,
  async function () {
    const actualCount = await Cart.getCheckoutCount();
    console.log("Count:", actualCount);
    expect(typeof actualCount).toBe("number");
    expect(actualCount).toBeGreaterThan(0);
  }
);

Then(/^I should see the cart icon with 0 items$/, async function () {
  const actualCount = await Cart.getCheckoutCount();
  console.log("Count:", actualCount);
  expect(actualCount).toBe(0);
});

Then(/^I should see a message saying "(.*)"$/, async (expectedText) => {
  await Confirm.getSuccessMessage(expectedText);
});

// Then(/^I should see a flash message saying (.*)$/, async (message) => {
//     await expect(SecurePage.flashAlert).toBeExisting();
//     await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining(message));
// });
