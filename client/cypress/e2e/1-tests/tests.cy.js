/* eslint-disable no-undef */

import { clientUrl, serverUrl } from '../../support/commands';

/// <reference types="cypress" />

describe('genericapp app', () => {
  beforeEach(() => {
    cy.request('POST', `${serverUrl}/api/testing/reset`);
  });
  describe('as an unregistered guest', () => {
    beforeEach(() => {
      cy.visit(clientUrl);
      cy.get('#main-routes-content'); // ensures cypress doesn't load guestId as null
    });
    describe('user interacts with the navbar', () => {
      it('takes them to the front page upon clicking "home"', () => {
        cy.contains('Home').click();
        cy.get('#front-page');
      });
      it('takes them to the login page upon clicking "login"', () => {
        cy.contains('Login').click();
        cy.url()
          .should('include', '/login');
        cy.contains('Register an account');
      });
      it('takes them to the registration page upon clicking "register"', () => {
        cy.contains('Register').click();
        cy.url()
          .should('include', '/registration');
        cy.contains('I\'m already registered');
      });
    });
    describe('on /registration', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/registration`);
      });
      it('will not process registration if fields are incomplete', () => {
        cy.get('#email-field')
          .type('adbc1234@gmail.com', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Please complete required fields');
      });
      it('will not process registration if email format is invalid', () => {
        cy.get('#email-field')
          .type('adbc12ail.com', { force: true });
        cy.get('#password-field')
          .type('defg5678', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Invalid email format');
      });
      it('will not process registration if password is too short', () => {
        cy.get('#email-field')
          .type('tester@genericapp.com', { force: true });
        cy.get('#password-field')
          .type('pass', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Please choose a password between 6 and 256 characters');
      });
      it('will not process registration if the email is already taken', () => {
        cy.get('#email-field')
          .type('userwithadmin@genericapp.com', { force: true });
        cy.get('#password-field')
          .type('userpassword', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Account with that email already exists');
      });
      it('processes valid registration form', () => {
        cy.enterValidRegistrationForm();
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('Registration successful');
      });
    });
    describe('on /login', () => {
      beforeEach(() => {
        cy.visit(`${clientUrl}/login`);
      });
      it('communicates if a user with the indicated email was not found', () => {
        cy.get('#email-field')
          .type('userxz@genericapp.com', { force: true });
        cy.get('#password-field')
          .type('userpassword', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.get('.notification')
          .should('contain.text', 'email')
          .should('have.class', 'red');
      });
      it('communicates if a user entered an incorrect password', () => {
        cy.get('#email-field')
          .type('userwithadmin@genericapp.com', { force: true });
        cy.get('#password-field')
          .type('userPasxword', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.get('.notification')
          .should('contain.text', 'password')
          .should('have.class', 'red');
      });
      it('processes valid login form with correct credentials', () => {
        cy.get('#email-field')
          .type('userwithadmin@genericapp.com', { force: true });
        cy.get('#password-field')
          .type('userpassword', { force: true });
        cy.get('#submit-button')
          .click({ force: true });
        cy.contains('You logged in successfully');
      });
    });
  });
  describe('as a registered user', () => {
    beforeEach(() => {
      cy.postLogin('userwithadmin@genericapp.com', 'userpassword');
      cy.visit(`${clientUrl}/`);
    });
    it('can log the user out of their account', () => {
      cy.contains('Account')
        .click({ force: true });
      cy.contains('Logout')
        .click({ force: true });
      cy.contains('You were logged out');
    });
  });
});

/*
http://localhost:3001/admin/menu/fooditems/bece6c76-ea23-4472-8bba-94a50a907c74
  describe('on /menu', () => {
    beforeEach(() => {
      cy.visit(`${clientUrl}/menu`);
    });
  });
*/
