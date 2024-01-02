/// <reference types="cypress" />

import { signUpLocators } from "../../pageObjects/signupLocators.spec";
import { signupData } from "../../pageObjects/signupData.spec";


const faker = require("faker");
const firstName = faker.name.firstName()
const lastName = faker.name.lastName()
const PhoneNumber = "32145632"; //faker.phone.phoneNumberFormat(1);
const email = firstName.toLocaleLowerCase() + "@mailinator.com"
const about = faker.lorem.paragraph()
const experience = Math.floor(Math.random() * 11);
const dayjs = require('dayjs')
const companyName = faker.company.companyName()
let password = "Outsized@2022";
let location_city = "india";
let linkedinURl = Math.random().toString(36).substring(2)


describe('Verifing registration flow', function () {

    // Get current date
    function pad2(n) {
        return (n < 10 ? '0' : '') + n;
    }
    var date = new Date();
    var month = pad2(date.getMonth() + 1);//months (0-11)
    var day = pad2(date.getDate());//day (1-31)
    var year = date.getFullYear();
    var formattedDate = year + "-" + month + "-" + day;

    it('Register new freelancer', function () {
        // Sending OTP using email
        cy.visit('/')
        cy.readFile('cypress/fixtures/Data.json').then((profile) => {
            cy.wait(2000)
            cy.xpath(signUpLocators.emailSignupButton).click({ force: true })
            cy.get(signUpLocators.emailTextbox).type(email.toLocaleLowerCase())
            profile.email = email
            profile.password = password
            cy.writeFile("cypress/fixtures/data.json", profile);
            //cy.get(signUpLocators.sendOTPButton).click()
            cy.wait(1000)
        })

        // Opening New window
        /* cy.openWindow(signupData.mailinatorURL)
        cy.readFile('cypress/fixtures/Data.json').then((profile) => {
            cy.xpath(signUpLocators.searchTextbox).type(profile.email)
        })
        cy.xpath(signUpLocators.goButton).click()
        cy.xpath(signUpLocators.outsizedEmail).click()  // find the right email
        cy.xpath(signUpLocators.emailIframe).its('0.contentDocument.body').should('not.be.empty')  // wait for loading
            .then(console.log)  // works with this but errors without - totally weird
            .wait(1000)
            .find("table > tbody > tr:nth-child(3) > td > h2")
            .then($h2 => {
                const OTP = $h2.text()
                cy.readFile('cypress/fixtures/Data.json').then((profile) => {
                    profile.OTP = OTP
                    cy.writeFile("cypress/fixtures/data.json", profile);
                })
            })
 */
        // Closing window
        cy.closeWindow()

        // Enter OTP and verifing email
   /*      cy.readFile('cypress/fixtures/Data.json').then((profile) => {
            cy.get('#otp').type(profile.OTP)
        })
        cy.get(signUpLocators.verifyOTPButton).click() */

        // Setting up account information
        //cy.get(signUpLocators.emailTextbox).should('have.attr', 'value', email)
        cy.get(signUpLocators.firstNameTextbox).type(firstName)
        cy.get(signUpLocators.lastNameTextbox).type(lastName)
        cy.get(signUpLocators.passwordTextbox).click()
        cy.get('.password-helper').should('exist')
            .should('contain', 'Have at least 8 characters')
            .should('contain', 'Have at least 1 letter (a, b, c...)')
            .should('contain', 'Have at least 1 number (1, 2, 3...)')
            .should('contain', 'Have at least 1 special character (@, !, ...)')
            .should('contain', 'Include both uppercase and lowercase characters')
        cy.get(signUpLocators.passwordTextbox).type(password)
        cy.contains('Create account').click()

        // Filing profile details manualy
        /*cy.get('h1').should('have.text', 'Fill out your profile to apply')
        cy.get('button').contains('Fill profile manually').click()*/
        cy.xpath('//span[@aria-label="edit"]').click()
        cy.wait(2000)
        cy.xpath('//button/span[contains(text(),"Next ")]').click()


        // Personal Information Screen
        cy.get(signUpLocators.nameTextbox).should('have.attr', 'value', firstName)
        cy.get(signUpLocators.lastNameTextbox).should('have.attr', 'value', lastName)
        cy.get(signUpLocators.profileImage).attachFile('Cypress.png')
        cy.get('.ant-btn-primary > span').contains('OK').click()
        cy.get('img').should('exist')
        cy.get(signUpLocators.headlineTextbox).type('Cypress Automation')
        cy.wait(2000)
        cy.get(signUpLocators.linkedinURl).type("demo1234"/*linkedinURl*/)
        cy.xpath('//*[@id="location"]' /*signUpLocators.city*/).click({ force: true })
        cy.xpath('//*[@id="location"]' /*signUpLocators.city*/).type(location_city)
        cy.get(signUpLocators.dropdownList).each(($el, index, $list) => {
            if ($el.text() === 'India') {
                cy.wrap($el).click()
            }
        })
        cy.get(signUpLocators.mobile).type(PhoneNumber)
        cy.get(signUpLocators.aboutTextbox).type(about)
        cy.get('button').contains('Save & Next').click()
        cy.wait(2000)

        // Professional Information Screen
        cy.url().should('contain', 'professional-information')
        cy.get(signUpLocators.experienceTextbox).click().type(experience)

        cy.get(signUpLocators.industryTextbox).type('Aut')
        cy.wait(2000)
        cy.get(signUpLocators.dropdownList).each(($industry, index, $list) => {
            if ($industry.text() === 'Automation') {
                cy.wrap($industry).click()
            }
        })
        cy.get(signUpLocators.skillTextbox).type('cy')
        cy.wait(1000)
        cy.get(signUpLocators.dropdownList).each(($skill, index, $list) => {
            if ($skill.text() === 'Cypress') {
                cy.wrap($skill).click()
            }
        })
      
        // Adding project
        cy.contains('Add Project').click()
        cy.get(signUpLocators.addProject).should('exist')
        cy.get(signUpLocators.clientName).type(firstName)
        cy.get(signUpLocators.profileImage).attachFile('Cypress.png')
        cy.get('.ant-btn-primary > span').contains('OK').click()
        cy.get('img').should('exist')
        cy.get(signUpLocators.projectLocation).type('sur')
        cy.wait(2000)
        cy.get('[title="Surat, Gujarat, India"]').click()
        /*cy.get('#add-project > div > div > div > div:nth-child(3) > div >div >div > div > div > div').each(($city, index, $list) => {
            if ($city.text() === 'Surat, Gujarat, India') {
                cy.wrap($city).click({ force: true })
            }
        })*/

        cy.get(signUpLocators.projectTitle).type('Cypress Automation Project')
        cy.get(signUpLocators.dateField).eq(0).click()
        cy.get(signUpLocators.selectCurrentDate).click()
        cy.get(signUpLocators.dateField).should('have.attr', 'value', formattedDate)
        cy.get(signUpLocators.dateField).eq(1).click()
        cy.get(signUpLocators.selectCurrentDate).eq(1).click()
        cy.get(signUpLocators.dateField).should('have.attr', 'value', formattedDate)
        cy.get(signUpLocators.projectSkill).type('Cyp')
        cy.wait(2000)
        cy.get(signUpLocators.dropdownList).each(($skill, index, $list) => {
            if ($skill.text() === 'Cypress') {
                cy.wrap($skill).click({ force: true })
            }
        })
        cy.get(signUpLocators.projectbriefTextbox).type(about)
        cy.xpath(signUpLocators.projectAddButton).click()
        //cy.xpath('//form[1]/div[4]/div[1]/div[2]/div').should('have.length', 1)
        cy.wait(2000)
        cy.get('button').contains('Save & Next').click()
        //cy.xpath("//button[contains(text(),'Save & Next')]").click()

        // Work Preference
        cy.get('.profile-border div div div div:nth-child(2) div:nth-child(2)').each(($work, index, $list) => {
            $work.click()
        })
        cy.get(signUpLocators.currancyTextbox).click()
        cy.get(signUpLocators.dropdownList).each(($currancy) => {
            if ($currancy.text() === "USD ($)") {
                cy.wrap($currancy).click()
            }
        })
        cy.get(signUpLocators.rateTextbox).type(experience)
        cy.get(signUpLocators.visibilityButton).should('have.attr', 'aria-checked', 'true')
        cy.xpath(signUpLocators.submitButton).click()
        cy.get(signUpLocators.applicationCompleteModel).should('be.visible')
        cy.xpath(signUpLocators.addAdditionalInfoButton).click()
        cy.url().should('include', 'create-profile/experience')

        // Additional Information
        cy.visit('https://outsized.site/create-profile/experience')
        cy.get(signUpLocators.uploadFile).attachFile('Resume.pdf')
        cy.get('.uploaded-file-name').should('have.text', 'Resume.pdf')
        // cy.get('.ba-videorecorder-chooser-button-1 > [ba-if="true"]').attachFile('TestVideo.mp4')
        // cy.get(signUpLocators.cvDeleteButton).should('be.visible')
        // cy.get(signUpLocators.playButton).should('have.attr','title','Click to play.')

        // Add Education
        cy.get(signUpLocators.addQualificationButton).click()
        cy.get('.ant-modal').should('be.visible')
        cy.get(signUpLocators.degreeTextbox).type('Master')
        cy.wait(1000)
        cy.get(signUpLocators.dropdownList).each(($degree, index, $list) => {
            if ($degree.text() === 'Master of Computer Applications') {
                cy.wrap($degree).click()
            }
        })
        cy.get(signUpLocators.instituteTextbox).type('sau')
        cy.wait(1000)
        cy.get(signUpLocators.dropdownList).each(($institute, index, $list) => {
            if ($institute.text() === "Saurashtra University") {
                cy.wrap($institute).click()
            }
        })
        cy.get(signUpLocators.educationLocation).type('sur')
        cy.wait(1000)
        cy.get(signUpLocators.dropdownList).each(($edu, index, $list) => {
            if ($edu.text() === "Surat, Gujarat, India") {
                cy.wrap($edu).click()
            }
        })
        cy.get(signUpLocators.issueDate).click()
        cy.get(signUpLocators.previousButton).click()
        cy.xpath(signUpLocators.issueYear).click()
        cy.get(signUpLocators.descriptionID).type(about)
        cy.xpath(signUpLocators.submitButtonSpan).click()
        cy.get('.info-card').should('exist')

        // Add Certificate
        cy.xpath(signUpLocators.addCertificateButton).click()
        cy.get(signUpLocators.certificateTextbox).type('Cypress Certificate')
        cy.get(signUpLocators.organizationTextbox).type('Cypress')
        cy.get(signUpLocators.certificateFromDate).click()
        cy.get(signUpLocators.selectCurrentDate).click()
        cy.get(signUpLocators.certificateFromDate).should('have.attr', 'value', formattedDate)
        cy.xpath(signUpLocators.submitButtonSpan).click()
        cy.get('.info-card.certificate').should('exist')

        // Work Experience
        cy.get(signUpLocators.workExperienceButton).click()
        cy.get(signUpLocators.positionTextbox).type('Aut')
        cy.wait(1000)
        cy.get(signUpLocators.dropdownList).each(($position, index, $list) => {
            if ($position.text() === 'Automation Tester') {
                cy.wrap($position).click()
            }
        })
        cy.get(signUpLocators.experienceCompany).type('Tata C')
        cy.wait(1000)
        cy.get(signUpLocators.dropdownList).each(($company, index, $list) => {
            if ($company.text() === 'Tata Consultancy Services') {
                cy.wrap($company).click()
            }
        })
        cy.get(signUpLocators.educationLocation).type('sur')
        cy.wait(1000)
        cy.get(signUpLocators.dropdownList).each(($exp, index, $list) => {
            if ($exp.text() === "Surat, Gujarat, India") {
                cy.wrap($exp).click()
            }
        })
        cy.get(signUpLocators.certificateFromDate).click()
        cy.get(signUpLocators.previousButton).click()
        cy.get(signUpLocators.previousButton).click()
        cy.xpath(signUpLocators.issueYear).click()
        cy.get(signUpLocators.descriptionID).type(about)
        cy.xpath(signUpLocators.submitButtonSpan).click()
        cy.get('.info-card').should('exist')
        cy.xpath(signUpLocators.saveButton).click()

        // Profile Page
        cy.url().should('contain', 'profile')
        cy.get(signUpLocators.thankYouModel).should('exist')
        cy.get(signUpLocators.thankYouModel).should('have.text', signupData.thankYouMessage)
        cy.get(signUpLocators.modelCloseButton).click()
        cy.get(signUpLocators.profileName).should('have.text', firstName + " " + lastName)
        cy.xpath(signUpLocators.logoutButton).click()
        cy.url().should('include', 'login')
    })

    it('Verifing forgot password', () => {
        cy.visit('/')
        cy.intercept('https://api.outsized.site/graphql').as('email')
        cy.get('a').contains('Sign In instead').click()
        cy.get('a').contains('Forgot Password?').click()
        cy.url().should('include', 'forgot-password')
        cy.get('a').should('contain', 'Sign In')
        cy.get('a').should('contain', 'Sign Up')
        cy.get(signUpLocators.resetPasswordButton).should('be.disabled')
        cy.readFile('cypress/fixtures/Data.json').then((profile) => {
            cy.get(signUpLocators.emailTextbox).type(profile.email)
        })
        cy.get(signUpLocators.resetPasswordButton)
            .should('be.enabled')
            .click()

        // Open new window
        cy.openWindow(signupData.mailinatorURL)
        cy.readFile('cypress/fixtures/Data.json').then((profile) => {
            cy.xpath(signUpLocators.searchTextbox).type(profile.email)
        })
        cy.xpath(signUpLocators.goButton).click()
        cy.xpath(signUpLocators.resetPasswordEmail).eq(0).click()  // find the right email
        cy.xpath(signUpLocators.emailIframe).its('0.contentDocument.body').should('not.be.empty')  // wait for loading
            .then(console.log)  // works with this but errors without - totally weird
            .wait(1000)
            .find("table > tbody > tr:nth-child(5) > td > a")
            .then($href => {
                const link = $href.prop('href')
                cy.readFile('cypress/fixtures/Data.json').then((profile) => {
                    profile.resetPasswordLink = link
                    cy.writeFile("cypress/fixtures/data.json", profile);
                })
            })
        // Closing window
        cy.closeWindow()
    })

    it('Reset Password', () => {
        cy.readFile('cypress/fixtures/Data.json').then((profile) => {
            cy.visit(profile.resetPasswordLink)
        })
        cy.url().should('include', 'reset-password')
        cy.xpath(signUpLocators.setNewPasswordButton).should('be.enabled')
        cy.xpath(signUpLocators.createPasswordTextbox).click().type('Outsized@2022')
        cy.xpath(signUpLocators.confirmPasswordTextbox).click().type('Outsized@2022')
        cy.xpath(signUpLocators.setNewPasswordButton).click()
        cy.contains('Password changed successfully')
        cy.url().should('include', 'login')
    })

    it('Verify login', () => {
        cy.visit('/login')
        cy.url().should('include', 'login')
        cy.xpath(signUpLocators.signInButton).should('be.disabled')
        cy.get('form > div:nth-child(3) >a').should('have.text', 'Forgot Password?')
        cy.xpath(signUpLocators.linkedinSignInButton).should('exist')
        cy.get('#__next >div>div:nth-child(3) >a').should('have.text', 'Sign Up instead')
        cy.readFile('cypress/fixtures/Data.json').then((profile) => {
            cy.get(signUpLocators.emailTextbox).type(profile.email)
            cy.get(signUpLocators.passwordTextbox).type(profile.password)
        })
        cy.xpath(signUpLocators.signInButton)
            .should('be.enabled')
            .click()
        cy.url().should('include', 'profile')
    })
})


// Firm Registration

/* describe('Register as a firm', function () {
    let companyEmail = "cypress." + firstName.toLocaleLowerCase() + "@mailinator.com"

    it('Register in firm', function () {
        cy.visit('signup?enableFirm=true')
        cy.readFile('cypress/fixtures/Data.json').then((profile) => {
            profile.firmEmail = companyEmail
            cy.writeFile('cypress/fixtures/Data.json', profile)
        })
        cy.xpath('//button[contains(text(),"I am a firm")]').should('be.visible')
        cy.get('a').should('contain', 'Sign In instead')
        cy.xpath(signUpLocators.firmRegisterButton).should('not.be.enabled')
        cy.get(signUpLocators.firmCompanyName).type(companyName)
        cy.get(signUpLocators.firmContactPersonName).type(firstName + " " + lastName)
        cy.get(signUpLocators.firmMobileNumber).type(PhoneNumber)
        cy.get(signUpLocators.emailTextbox).type(companyEmail)
        cy.get(signUpLocators.passwordTextbox).click()
        cy.get('.password-helper').should('exist')
            .should('contain', 'Have at least 8 characters')
            .should('contain', 'Have at least 1 number (1, 2, 3...)')
            .should('contain', 'Have at least 1 special character (@, !, ...)')
            .should('contain', 'Include both uppercase and lowercase characters')
        cy.get(signUpLocators.passwordTextbox).type(password)
        cy.get(signUpLocators.firmRole).type('Manual Tester')
        cy.xpath(signUpLocators.firmRegisterButton)
            .should('be.enabled')
            .click()
        cy.get('body').should('contain', 'Your profile has been created!')
        cy.url().should('include', 'company-profile')

        // Company information
        cy.get('.os-progressbar')
            .should('exist')
        cy.get('button')
            .contains('Save & Next')
            .should('exist')
            .should('be.disabled')
        cy.get(signUpLocators.nameTextbox).should('have.attr', 'value', companyName)
        cy.get('input[type="file"]').attachFile('Cypress.png')
        cy.get('.ant-btn-primary > span').contains('OK').click()
        cy.get('.uploaded-img-name').should('have.text', 'Cypress.png')
        cy.get(signUpLocators.firmLink).type('test.com')
        cy.get(signUpLocators.firmLinkedinURL).type("https://www.linkedin.com/company/" + linkedinURl)
        cy.get(signUpLocators.descriptionID).type(about)
        cy.xpath(signUpLocators.firmEmployee).click()
        cy.get(signUpLocators.firmLocation).type('sur')
        cy.wait(1000)
        cy.get(signUpLocators.dropdownList).each(($edu, index, $list) => {
            if ($edu.text() === "Surat, Gujarat, India") {
                cy.wrap($edu).click()
            }
        })
        cy.get(signUpLocators.profileImage).eq(1).attachFile('Resume.pdf')
        cy.get('div.secondary-text span:nth-child(2)').should('have.text', 'Resume.pdf')
        cy.get('button')
            .contains('Save & Next')
            .should('be.enabled')
            .click()

        // Expertise screen
        cy.url().should('include', 'expertise-experience')
        cy.get('div.os-skills-collection').should('exist')
        cy.xpath(signUpLocators.submitButton).should('be.disabled')
        cy.get(signUpLocators.firmSkill).type('Cyp')
        cy.wait(1000)
        cy.get(signUpLocators.dropdownList).each(($skill, index, $list) => {
            if ($skill.text() === 'Cypress') {
                cy.wrap($skill).click({ force: true })
            }
        })
        cy.get(signUpLocators.firmSector).type('aut')
        cy.wait(2000)
        cy.get(signUpLocators.dropdownList).each(($skill, index, $list) => {
            if ($skill.text() === 'Automation') {
                cy.wrap($skill).click({ force: true })
            }
        })
        cy.xpath(signUpLocators.submitButton).should('be.disabled')

        // Add project
        cy.get(signUpLocators.addProjectButton).click()
        cy.get('.ant-modal-content').should('be.visible')
        cy.xpath(signUpLocators.firmProjectSaveButton).should('be.disabled')
        cy.get(signUpLocators.nameTextbox).type(firstName)
        cy.get(signUpLocators.descriptionID).type(about)
        cy.get(signUpLocators.currentWorkingID).should('be.checked')
        cy.get(signUpLocators.firmStartDate).click()
        cy.xpath('//tbody/tr[1]/td[1]/div[1]').click()
        cy.get(signUpLocators.firmProjectSkill).type('Cyp')
        cy.wait(3000)
        cy.get(signUpLocators.dropdownList).each(($skill, index, $list) => {
            if ($skill.text() === 'Cypress') {
                cy.wrap($skill).click({ force: true })
            }
        })
        cy.get(signUpLocators.profileImage).attachFile('Resume.pdf')
        cy.get('div.secondary-text span:nth-child(2)').should('have.text', 'Resume.pdf')
        cy.xpath(signUpLocators.firmProjectSaveButton)
            .should('be.enabled')
            .click()
        cy.get('form > div:nth-child(3)>div >div>div>div>div>div:nth-child(2)>div').should('have.length', 1)
        cy.xpath(signUpLocators.firmAddAnotherButton).should('exist')
        cy.xpath(signUpLocators.submitButton)
            .should('be.enabled')
            .click()
        cy.get('.application-completed-modal').should('exist')
        cy.get('.modal-header').should('have.text', 'Application complete')
        cy.xpath(signUpLocators.exploreOpportunityButton).should('exist')
        cy.xpath(signUpLocators.checkMyProfileButton)
            .should('exist')
            .click()

        // Profile screen
        cy.url().should('include', 'firm-profile')
        cy.xpath(signUpLocators.frimContactUSButton)
            .should('exist')
            .should('be.visible')
            .should('be.enabled')
        cy.get('.ant-tabs-content-holder >div>div>div').should('have.length', 4)
        cy.xpath(signUpLocators.logoutButton).click()
        cy.url().should('include', 'login')
    })

    it('Sign in to firm', function () {
        cy.visit('login?enableFirm=true')
        cy.readFile('cypress/fixtures/Data.json').then((profile) => {
            cy.get(signUpLocators.emailTextbox)
                .click()
                .type(profile.firmEmail)
            cy.get(signUpLocators.passwordTextbox)
                .click()
                .type("Outsized@2022")
        })
        cy.xpath(signUpLocators.signInButton).click()
        cy.url().should('include', 'firm-profile')
        cy.xpath(signUpLocators.frimContactUSButton)
            .should('exist')
            .should('be.visible')
            .should('be.enabled')
        cy.get('.ant-tabs-content-holder >div>div>div').should('have.length', 4)
        cy.xpath(signUpLocators.logoutButton).click()
        cy.url().should('include', 'login')
    })

    it('Verifing firm forgot password', () => {
        cy.visit('login?enableFirm=true')
        cy.get('a').contains('Forgot Password?').click()
        cy.url().should('include', 'forgot-password')
        cy.get('a').should('contain', 'Sign In')
        cy.get('a').should('contain', 'Sign Up')
        cy.get(signUpLocators.resetPasswordButton).should('be.disabled')
        cy.readFile('cypress/fixtures/Data.json').then((profile) => {
            cy.get(signUpLocators.emailTextbox).type(profile.firmEmail)
        })
        cy.get(signUpLocators.resetPasswordButton)
            .should('be.enabled')
            .click()

        // Open new window
        cy.openWindow(signupData.mailinatorURL)
        cy.readFile('cypress/fixtures/Data.json').then((profile) => {
            cy.xpath(signUpLocators.searchTextbox).type(profile.firmEmail)
        })
        cy.xpath(signUpLocators.goButton).click()
        cy.xpath(signUpLocators.resetPasswordEmail).eq(0).click()  // find the right email
        cy.xpath(signUpLocators.emailIframe).its('0.contentDocument.body').should('not.be.empty')  // wait for loading
            .then(console.log)  // works with this but errors without - totally weird
            .wait(1000)
            .find("table > tbody > tr:nth-child(5) > td > a")
            .then($href => {
                const link = $href.prop('href')
                cy.readFile('cypress/fixtures/Data.json').then((profile) => {
                    profile.resetPasswordLink = link
                    cy.writeFile("cypress/fixtures/data.json", profile);
                })
            })
        // Closing window
        cy.closeWindow()
    })

    it('Firm Reset Password', () => {
        cy.readFile('cypress/fixtures/Data.json').then((profile) => {
            cy.visit(profile.resetPasswordLink)
        })
        cy.url().should('include', 'reset-password')
        cy.xpath(signUpLocators.setNewPasswordButton).should('be.enabled')
        cy.xpath(signUpLocators.createPasswordTextbox).click().type('Outsized@2022')
        cy.xpath(signUpLocators.confirmPasswordTextbox).click().type('Outsized@2022')
        cy.xpath(signUpLocators.setNewPasswordButton).click()
        cy.contains('Password changed successfully')
        cy.url().should('include', 'login')
    })
}) */