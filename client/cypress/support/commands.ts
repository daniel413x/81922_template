/// <reference types="cypress" />

export const clientUrl = 'http://localhost:3001';
export const serverUrl = 'http://localhost:6001';

/*

const commandDelay = 500;
const delayedCommands = ['visit', 'click', 'trigger', 'type', 'clear', 'reload', 'contains'];

for (let c = 0; c < delayedCommands.length; c += 1) {
  Cypress.Commands.overwrite(delayedCommands[c], (originalFn, ...args) => {
    const origVal = originalFn(...args);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(origVal);
      }, commandDelay);
    });
  });
}

*/

Cypress.Commands.add('enterValidRegistrationForm', () => {
  cy.get('#email-field')
    .type('adbc1234@gmail.com', { force: true });
  cy.get('#password-field')
    .type('defg5678', { force: true });
});

Cypress.Commands.add('postCreateUser', () => {
  const user = {
    email: 'tester@genericapp.com',
    password: 'testerpassword',
    guestId: localStorage.getItem('guestId'),
  };
  cy.request('POST', `${serverUrl}/api/user/registration`, user)
    .then(({ body }) => {
      localStorage.setItem('registeredToken', JSON.stringify(body));
    });
});

Cypress.Commands.add('postLogin', (email, password) => {
  const user = {
    email,
    password,
  };
  cy.request('POST', `${serverUrl}/api/user/login`, user)
    .then(({ body }) => {
      localStorage.setItem('registeredToken', body.token);
    });
});

export {};
