// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-iframe';
import 'cypress-file-upload';

// Command Delay code
const COMMAND_DELAY = 800;
for (const command of ['visit', 'click', 'trigger', 'type', 'clear', 'reload', 'contains']) {
  Cypress.Commands.overwrite(command, (originalFn, ...args) => {
    const origVal = originalFn(...args);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(origVal);
      }, COMMAND_DELAY);
    });
  });
}

// Open close and swiching new window code
let originalWindow = null;

Cypress.Commands.add('openWindow', (url, features) => {
  if (!originalWindow) {
    originalWindow = cy.state('window');
    originalWindow.APP_ID = 1; // depth 1
  }
  const w = Cypress.config('viewportWidth')
  const h = Cypress.config('viewportHeight')
  if (!features) {
    features = `width=${w}, height=${h}`
  }
  console.log('openWindow %s "%s"', url, features)

  return new Promise(resolve => {
    if (window.top.MyAltWindow && window.top.MyAltWindow.close) {
      console.log('window exists already')
      window.top.MyAltWindow.close()
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/open
    window.top.MyAltWindow = window.top.open(url, 'MyAltWindow', features)
    window.top.MyAltWindow.APP_ID = 2; // TODO: make this support n-many

    // letting page enough time to load and set "document.domain = localhost"
    // so we can access it
    setTimeout(() => {
      cy.state('document', window.top.MyAltWindow.document)
      cy.state('window', window.top.MyAltWindow)
      resolve()
    }, 500)
  })
})

/* toggle between 2 for now, could set this up to handle N-many windows */
Cypress.Commands.add('toggleWindows', () => {
  return new Promise(resolve => {
    if (cy.state('window').APP_ID === 1) {
      // switch to our ALT window
      console.log('switching to alt popup window...')
      cy.state('document', originalWindow.top.MyAltWindow.document)
      cy.state('window', originalWindow.top.MyAltWindow)
      originalWindow.blur()
    } else {
      console.log('switching back to original window')
      // switch back to originalWindow
      cy.state('document', originalWindow.document)
      cy.state('window', originalWindow)
      originalWindow.top.MyAltWindow.blur()
    }
    window.blur();

    cy.state('window').focus()

    resolve();
  })
})

Cypress.Commands.add('closeWindow', () => {
  return new Promise(resolve => {
    if (window.top.MyAltWindow && window.top.MyAltWindow.close) {
      window.top.MyAltWindow.close() // close popup
      window.top.MyAltWindow = null
    }
    if (originalWindow) {
      cy.state('document', originalWindow.document)
      cy.state('window', originalWindow)
    }
    cy.state('window').focus()
    resolve()
  })
})