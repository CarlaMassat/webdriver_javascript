import { $, browser } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */

class LoginPage extends Page {
    /**
    
     */

  
    get signUsername () {
        return $("//input[@name='username']")
    }

    get signPassword () {
        return $("//input[@name='password']");
    }

    get ErrorMessage () {
        return $(".alert-danger");
    }


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

  
    
    async login (username, password) {
        await this.signUsername.setValue(username);
        await this.signPassword.setValue(password); 
    }
    

 
    async errorText () {
        await this.ErrorMessage.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'Error message is not showing up'
        });

        await browser.waitUntil(
            async () => await this.ErrorMessage.isDisplayed(),
            {
            timeout: 7000,
            interval: 200,
            timeoutMsg: 'Error message is not becoming visible'
            }
        );
    
       return await this.ErrorMessage.getText();
    }


      open () {
        return super.open('loginpagePractise');
    }
}

export default new LoginPage();
