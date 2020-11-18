const {
    Given,
    When,
    Then,
    And
} = require('cucumber');
const testData = require("../test_data/testData");
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

Given('user is able to launch the shopping website', function () {

    browser.url('');
    browser.maximizeWindow();
    expect(browser.getTitle()).to.equals('My Store');
})

When('the Sign in button is enabled', function () {

    var signInButton = $('//a[@class="login"]')
    signInButton.click();
})

Then('user is able to initiate create Account by entering as email address', function () {

    var createAnAccountSubheading = $('//h3[text()="Create an account"]')
    var emailIdInput = $('//input[@id="email_create"]')
    var createAnAccountButton = $('//button[@id="SubmitCreate"]')
    var yourPersonalInformation = $('//h3[text()="Your personal information"]')

    assert.equal(createAnAccountSubheading.isDisplayed(), true, "Create An Account is displayed");
    createAnAccountButton.scrollIntoView();
    emailIdInput.setValue(testData.userEmail);
    createAnAccountButton.click();
    yourPersonalInformation.waitForDisplayed();
    assert.equal(yourPersonalInformation.isDisplayed(), true, "Your Personal Information form is displayed");
})


Then('user is able to enter details on the Your Personal Information and click Register', function () {

    var genderRadio = $('//input[@id="id_gender1"]')
    var firstNameInput = $('//input[@id="customer_firstname"]')
    var lastNameInput = $('//input[@id="customer_lastname"]')
    var passwordInput = $('//input[@id="passwd"]')
    var dobDateSelect = $('//select[@id="days"]')
    var dobMonthSelect = $('//select[@id="months"]')
    var dobYearSelect = $('//select[@id="years"]')
    var companyInput = $('//input[@id="company"]')
    var addressLine1Input = $('//input[@id="address1"]')
    var addressLine2Input = $('//input[@id="address2"]')
    var cityInput = $('//input[@id="city"]')
    var stateSelect = $('//select[@id="id_state"]')
    var zipInput = $('//input[@id="postcode"]')
    var additionalInfoTextArea = $('//textarea[@id="other"]')
    var homePhoneInput = $('//input[@id="phone"]')
    var mobilePhoneInput = $('//input[@id="phone_mobile"]')
    var addressAliasInput = $('//input[@id="alias"]')
    var createAnAccountButton = $('//button[@id="submitAccount"]')
    var accountSuccess = $('//a[@title="View my customer account"]')

    genderRadio.click();
    firstNameInput.setValue(testData.firstName);
    lastNameInput.setValue(testData.lastName);
    passwordInput.setValue("Test1234");
    dobDateSelect.selectByAttribute("value", "5");
    dobMonthSelect.selectByIndex("5");
    dobYearSelect.selectByAttribute("value", "2001");
    companyInput.setValue("Comp");
    addressLine1Input.setValue("AddressLine1");
    addressLine2Input.setValue("AddressLine2");
    cityInput.setValue("California");
    stateSelect.selectByVisibleText("Alaska");
    zipInput.setValue("90201");
    additionalInfoTextArea.setValue("None");
    homePhoneInput.setValue("03 9999 8888");
    mobilePhoneInput.setValue("0425604256");
    createAnAccountButton.click();
    accountSuccess.waitForDisplayed();
    assert.equal(accountSuccess.isDisplayed(), true, "User account created successfully");
})

Then('validate on the landing screen correct name and surname is displayed', function () {
    var loggedInUserName = $('//a[@title="View my customer account"]/span')

    const userNameFound = loggedInUserName.getText();
    assert.equal(userNameFound, testData.firstName + " " + testData.lastName, "Correct user name is displayed");
})

Then('add a product to the cart', function () {
    var searchProductInput = $('//input[@id="search_query_top"]')
    var searchProductButton = $('//button[@name="submit_search"]')
    var printedSummerDress = $('//a[@title="Faded Short Sleeve T-shirts"]')
    var dressSelectedScreen = $('//h1[@itemprop="name"]')
    var addToCartButton = $('//p[@id="add_to_cart"]/button[@type="submit"]');
    var proceedToCheckoutButton = $('//a[@title="Proceed to checkout"]')

    searchProductInput.setValue("Faded Short Sleeve T-shirts");
    searchProductButton.click();
    printedSummerDress.waitForDisplayed();
    assert.equal(printedSummerDress.isDisplayed(), true, "Searched product is displayed");
    printedSummerDress.click();
    dressSelectedScreen.waitForDisplayed();
    addToCartButton.click();
    proceedToCheckoutButton.waitForDisplayed();
    assert.equal(proceedToCheckoutButton.isDisplayed(), true, "Product successfully added to cart.");
})


Then('proceed to the checkout page and continue till payments', function () {

    var productDisplayedPrice = $('//span[@class="ajax_block_cart_total"]')
    var proceedToCheckoutButton = $('//a[@title="Proceed to checkout"]')
    var proceedToCheckoutSummaryButton = $('//a[@class="button btn btn-default standard-checkout button-medium"]')
    var proceedToCheckoutAddressButton = $('//button[@name="processAddress"]')
    var proceedToCheckoutShippingButton = $('//button[@name="processCarrier"]')
    var agreeTermsCheckbox = $('//input[@id="cgv"]')
    var paymentsScreenHeading = $('//h1[@class="page-heading"]')

    let productPrice = productDisplayedPrice.getText()
    console.log("The product price is : ", productPrice);
    productInfo.setPrice(productPrice);
    console.log("The SET price is : ", productInfo.getPrice());
    proceedToCheckoutButton.click();
    proceedToCheckoutSummaryButton.waitForDisplayed();
    proceedToCheckoutSummaryButton.click();
    proceedToCheckoutAddressButton.waitForDisplayed();
    proceedToCheckoutAddressButton.click();
    proceedToCheckoutShippingButton.waitForDisplayed();
    agreeTermsCheckbox.click();
    proceedToCheckoutShippingButton.click();
    paymentsScreenHeading.waitForDisplayed();
    assert.equal(paymentsScreenHeading.getText(), "PLEASE CHOOSE YOUR PAYMENT METHOD", "Paymnet screen navigation completed.")
})

Then('validate on the payments page if the product details are correct', function () {
    var paymentScreenTotal = $('//span[@id="total_price"]')

    paymentScreenTotal.scrollIntoView();
    assert.equal(paymentScreenTotal.getText(), productInfo.getPrice(), "Product price is displayed correct : " + productInfo.getPrice());
})


let productInfo = {
    price: "",

    getPrice: function () {
        return this.price;
    },

    setPrice: function (value) {
        this.price = value;
    }
};