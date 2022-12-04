import enableCypressReplay, { ReplayMode } from "cypress-replay";
import { Login } from "../support/pageObjects/Login.po";

/**
 * ReplayMode.Recording: Record a new test
 * ReplayMode.Replaying: Replay a recorded test
 */
const stubMode = ReplayMode.Replaying;

describe('Asset management system', () => {
  enableCypressReplay(stubMode);

  const LoginPage = new Login();
  let data;

  beforeEach(() => {
    cy.fixture('testData').then((testData) => {
      data = testData;
    });
    cy.visit('/');
  });

  it('Validate login error', () => {
    LoginPage.formTitle().should('be.visible').should('contain', data.login.title);
    LoginPage.doLogin(data.login.incorrectCredentials.username, data.login.incorrectCredentials.password);
    cy.get('div.toast-body').should('contain', data.login.toastMessage.errorIncorrectUsername);
  });

  it('Validate login success', () => {
    LoginPage.formTitle().should('be.visible').should('contain', data.login.title);
    LoginPage.doLogin(data.login.correctCredentials.username, data.login.correctCredentials.password);
    cy.get('div.toast-body').should('contain', data.login.toastMessage.success);
  });

})