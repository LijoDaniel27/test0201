const signUpLocators = {
    // Mailinator Locators
    searchTextbox: "//input[@id='search']",
    goButton: '//*[text()="GO"]',
    outsizedEmail: "//td[contains(text(),'Outsized: OTP for email verification')]",
    emailIframe: '//iframe[@id="html_msg_body"]',

    // Sign-Up locators
    emailSignupButton: '//button[text()=" Sign Up with Email"]',
    emailTextbox: '#email',
    sendOTPButton: ".ant-btn",
    verifyOTPButton: '[form="verify-otp"]',

    // Account info
    firstNameTextbox: '#firstName',
    lastNameTextbox: '#lastName',
    passwordTextbox: '#password',

    // Personal Information Screen
    nameTextbox: '#name',
    profileImage: "[type='file']",
    headlineTextbox: '#headline',
    linkedinURl: '#linkedin',
    city: '[type="search"]',
    mobile: '[aria-label="Mobile Number"]',
    aboutTextbox: '#about',

    // Professional Information Screen
    experienceTextbox: '[type="number"]',
    skillTextbox: '[placeholder="Ex: Project management"]',
    dropdownList: '.rc-virtual-list >div>div>div >*',
    industryTextbox: '[placeholder="Ex: Banking"]',

    // Add Project
    addProject: '#add-project',
    clientName: '#clientName',
    projectLocation: '[placeholder="Ex: London "]', //'#city',
    projectTitle: '#projectTitle',
    dateField: '[placeholder="Select date"]',
    selectCurrentDate: '.ant-picker-dropdown div div a',
    projectSkill: '[placeholder="Ex: Agile Coaching, Agile diagnostic"]',
    projectbriefTextbox: '#brief',
    projectAddButton: "//button[contains(text(),'Add')]",

    // Work Preference
    currancyTextbox: ".ant-select-selector",
    rateTextbox: 'input[type="number"]',
    visibilityButton: 'button[type="button"]',
    submitButton: "//button[contains(text(),'Submit')]",
    submitButtonSpan: "//button/span[contains(text(),'Submit')]",
    submitDashboardButton: "//button[contains(text(),'Save and Go to dashboard')]",
    applicationCompleteModel: '.application-completed-modal',
    addAdditionalInfoButton: "//button/span[contains(text(),'Add Additional Info')]",

    // Additional Information
    uploadFile: '[type="file"]',
    cvDeleteButton: '.delete-btn .pi-delete',
    playButton: '[data-selector="play-button"]',
    addQualificationButton: '.qualification >div >button',
    degreeTextbox: `input[placeholder="Bachelor’s"]`,
    instituteTextbox: 'input[placeholder="Rutgers University"]',
    educationLocation: 'input[placeholder="New Jersey, USA"]',
    issueDate: '#passOutYear',
    previousButton: '.ant-picker-header button .ant-picker-super-prev-icon',
    issueYear: '//table/tbody/tr[1]/td[1]',
    descriptionID: '#description',
    addCertificateButton: '(//button/span[text()="Add more"])[2]',
    certificateTextbox: '#certificateName',
    organizationTextbox: '#authority',
    certificateFromDate: '#fromDate',
    workExperienceButton: '.experience > div > button',
    positionTextbox: 'input[placeholder="Sale’s Manager"]',
    experienceCompany: 'input[placeholder="Microsoft"]',
    saveButton: "//button[contains(text(),'Save')]",

    // Profile Page
    thankYouModel: '.css-1v5y5lk-Modal-flexCenter >div >div >div >p >strong',
    modelCloseButton: '.css-1ix32vz-modalContainer > .pi',
    profileName: '.linkedin-card-container >div >div >div >div:nth-child(2) >div >span',
    logoutButton: "//span[contains(text(),'Logout')]",

    // Forgot Password
    resetPasswordButton: 'button[type="button"]',
    resetPasswordEmail: "//td[contains(text(),'Password Reset Email')]",
    createPasswordTextbox: "//div[contains(text(),'Create Password')]",
    confirmPasswordTextbox: "//div[contains(text(),'Confirm Password')]",
    setNewPasswordButton: '//button[contains(text(),"Set New Password")]',

    // Login
    signInButton: "//button[contains(text(),'Sign In')]",
    linkedinSignInButton: "button>div>span",

    // Firm selector
    firmCompanyName: '#companyName',
    firmContactPersonName: '#adminName',
    firmMobileNumber: '[aria-label="Mobile Number"]',
    firmRole: '#adminRole',
    firmRegisterButton: '//span[contains(text(),"Register")]/parent::button',
    firmLink: '#link',
    firmLinkedinURL: '#linkedinUrl',
    firmEmployee: "//div[contains(text(),'Less than 10')]",
    firmLocation: '[placeholder="Singapore"]',
    firmSkill: 'input[placeholder="Select key skills"]',
    firmSector: 'input[placeholder=" Select key sectors"]',
    addProjectButton: '.add-project-button',
    firmStartDate: '#startDate',
    currentWorkingID: '#isCurrentlyWorking',
    firmProjectSkill: 'input[placeholder="Select core firm skills"]',
    firmProjectSaveButton: "//span[contains(text(),'Save')]/parent::button",
    firmAddAnotherButton: "//div[contains(text(),'Add another project')]",
    frimContactUSButton: "//span[contains(text(),'Contact us')]/parent::div/parent::button",
    checkMyProfileButton: '//span[text()="Check my profile"]/parent::button',
    exploreOpportunityButton: '//span[text()="Explore opportunities"]/parent::button',
}
export { signUpLocators }