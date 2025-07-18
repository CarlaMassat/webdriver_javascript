import { $, browser } from '@wdio/globals'

class UiControls  {

 get termsConditions () {
        return $("input[id='terms']");
    }

   
 get btnSubmit () {
    return $("#signInBtn");
    }

get modalOkBtn () {
    return $("#okayBtn");
    
}

get modalCancelBtn () {
    return $('#cancelBtn');
}

get modalContent () {
    return $('.modal-content')
}


get dropdown () {
    return $("//select[@class='form-control']"); 
}


async checkCondition() {
     await this.termsConditions.click();
}


async clickRadio(valueToSelect) {
    const radio = await $(`input[type="radio"][value="${valueToSelect}"]`);
    await radio.waitForExist({ timeout: 3000 });
    await radio.click();
}


async modal() {
     await browser.waitUntil(
        async () => await this.modalOkBtn.isDisplayed(),
        {
            timeout: 5000,
            timeoutMsg: 'error message'
        }    
     );
    await this.modalOkBtn.click();

}

async modalCancel () {

    await browser.waitUntil(
        async () => await this.modalCancelBtn.isDisplayed(),
        {
            timeout: 5000,
            timeoutMsg: 'error message'
        }
    );

    await this.modalCancelBtn.click();
}


async submit() {
    await this.btnSubmit.click();
}

// 
async clickDropdown() {

    await browser.waitUntil(
   async () => await this.dropdown.isDisplayed(),
   {

    timeout: 5000,
    timeoutMsg: 'error message'
   }
    );

    return this.dropdown;

    }
}

export default new UiControls();