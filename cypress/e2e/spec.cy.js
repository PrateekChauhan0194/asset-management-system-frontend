import enableCypressReplay, { ReplayMode } from "cypress-replay";
import { Login } from "../support/pageObjects/Login.po";

/**
 * ReplayMode.Recording: Record a new test
 * ReplayMode.Replaying: Replay a recorded test
 */
const stubMode = ReplayMode.Replaying;

describe('Asset management system', () => {
  enableCypressReplay(stubMode);

  beforeEach(() => {
    cy.visit('/');
  });

  it('Validate login error', () => {
    const LoginPage = new Login();
    LoginPage.formTitle().should('be.visible').should('contain', 'Asset management system - Login');
    LoginPage.doLogin('admin', 'admin');
    cy.get('div.toast-body').should('contain', 'Incorrect username or password!');
  });

  it('Validate login success', () => {
    const LoginPage = new Login();
    LoginPage.formTitle().should('be.visible').should('contain', 'Asset management system - Login');
    LoginPage.doLogin('admin', 'Password123!');
    cy.get('div.toast-body').should('contain', 'Login successful, Welcome!');
  });

})