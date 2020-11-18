Feature: Register on the website

Scenario: Register a new user and validate payment

#Scenario Outline: Scenario Outline name
Given user is able to launch the shopping website
When the Sign in button is enabled
Then user is able to initiate create Account by entering as email address
And user is able to enter details on the Your Personal Information and click Register
And validate on the landing screen correct name and surname is displayed
And add a product to the cart
And proceed to the checkout page and continue till payments
And validate on the payments page if the product details are correct
