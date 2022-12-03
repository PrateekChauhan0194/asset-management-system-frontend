export class Login {
    formTitle = () => cy.get('.form-title');
    username = () => cy.get('.username');
    password = () => cy.get('.password');
    login = () => cy.get('.login');
    loginError = () => cy.get('div.toast-body');

    // define a method to login
    doLogin = (username, password) => {
        this.username().type(username);
        this.password().type(password);
        this.login().click();
    }
}