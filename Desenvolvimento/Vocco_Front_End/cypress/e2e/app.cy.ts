class RegisterForm {
    elements = {
        nameInput: () => cy.get('#nome'),
        emailInput: () => cy.get('#email'),
        birthdayInput: () => cy.get('#dataNascimento'),
        phoneNumberInput: () => cy.get('#celular'),
        educationLevelInput: () => cy.get('#nivelEscolar'),
        passwordInput: () => cy.get('#senha'),
        passwordConfirmationInput: () => cy.get('#confirmarSenha'),
        checkboxTerms: () => cy.get('#checkboxTerms'),
        submitButton: () => cy.get('#registerButton'),
    };

    typeName(text) {
        if(!text) return;
        this.elements.nameInput().type(text);
    }

    typeEmail(text) {
        if(!text) return;
        this.elements.emailInput().type(text);
    }

    typeBirthday(date) {
        if(!date) return;
        this.elements.birthdayInput().type(date);
    }

    typePhoneNumber(text) {
        if(!text) return;
        this.elements.phoneNumberInput().type(text);
    }

    typeEducationLevel(text) {
        this.elements.educationLevelInput()
            .type(text)
            .type('{downArrow}')
            .type('{enter}');
    }

    typePassword(text) {
        if(!text) return;
        this.elements.passwordInput().type(text);
    }

    typePasswordConfirmation(text) {
        if(!text) return;
        this.elements.passwordConfirmationInput().type(text);
    }
}

class LoginForm {
    elements = {
        emailInput: () => cy.get('#login'),
        passwordInput: () => cy.get('#senha'),
        loginButton: () => cy.get('#loginButton'),
    };

    typeEmail(text) {
        if(!text) return;
        this.elements.emailInput().type(text);
    }

    typePassword(text) {
        if(!text) return;
        this.elements.passwordInput().type(text);
    }
}

const registerForm = new RegisterForm();
const loginForm = new LoginForm();

describe('User Registration', () => {
    const input = {
        name: 'Teste Automatizado',
        email: 'testeautomatizado@email.com',
        birthday: '2000-11-08',
        phoneNumber: '11999999999',
        educationLevel: 'Superior completo',
        password: '123123',
        passwordConfirmation: '123123'
    };

    it('Enter in register form', () => {
        cy.visit('/');
        cy.wait(2000);
        cy.get('#loginHomePageButton').click();
        cy.wait(2000);
        cy.get('#registerLink').click();
    });

    it('Submitting user info', () => {
        registerForm.typeName(input.name);
        registerForm.typeEmail(input.email);
        registerForm.typeBirthday(input.birthday);
        registerForm.typePhoneNumber(input.phoneNumber);
        registerForm.typeEducationLevel(input.educationLevel);
        registerForm.typePassword(input.password);
        registerForm.typePasswordConfirmation(input.passwordConfirmation);

        registerForm.elements.checkboxTerms().click();
        registerForm.elements.submitButton().click();
        cy.url({ timeout: 10000 }).should('include', '/login');
    });
});

describe('User login', () => {
    const input = {
        email: 'testeautomatizado@email.com',
        password: '123123',
    };

    it('Input user info', () => {
        loginForm.typeEmail(input.email);
        loginForm.typePassword(input.password);
    });

    it('Enter student dashboard', () => {
        cy.get('#loginButton').click();
        cy.url({ timeout: 5000 }).should('include', '/estudante');
    });
});

describe('Acess account settings list page', () => {
    it('Acess account settings page', () => {
        cy.get('#myAccountButton').click();
        cy.url().should('include', '/minha-conta');
        cy.wait(2000);
    });
});

describe('Acess course list page', () => {
    it('Acess course list page', () => {
        cy.get('#coursesButton').click();
        cy.url().should('include', '/curso');
    });

    it('Search course', () => {
        cy.get('#courseTitleSearch').type('Sistemas da informação');
        cy.wait(2000);
    });
});

describe('Answer vocational test', () => {
    it('Enter vocational test', () => {
        cy.get('#dashboardButton').click();
        cy.get('#testButton').click();
        cy.url().should('include', '/teste-vocacional');
    });

    it('Test introduction - Graduation option', () => {
        cy.get('#navigateNextButton').click();
        cy.get('#graduationButton').click();
        cy.get('#testIntroButton').click();
    });

    it('Answer test', () => {
        function getRandomInt(min, max) {
            const minCeiled = Math.ceil(min);
            const maxFloored = Math.floor(max);
            return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
        }

        for (let i = 0; i <= 29; i++) {
            cy.get('#emoji' + getRandomInt(1, 6)).click();
            cy.get('#navigateNextTestButton').click();
        }

        cy.get('#sendTestButton').click();
        cy.wait(5000);
    });
});

describe('Delete account', () => {
    it('Acess account settings page', () => {
        cy.visit('/minha-conta');
    });

    it('Delete account', () => {
        cy.get('#deleteButton').click();
        cy.wait(2000);
        cy.get('#confirmDeleteButton').click();
        cy.url().should('include', '/login');
    });
});