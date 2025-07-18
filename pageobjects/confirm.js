import {$, browser, expect} from '@wdio/globals'

class Confirm {

get checkout () {
    return $('.btn-success')
}

  get country () {
        return $('#country');
    }

  get termCondition () {
    return $("label[for='checkbox2']");
  }


get suggestions () {
    return $('.suggestions a');
}

get purchase () {
    return $('.btn-lg');
}

get successMessage () {
    return $('.alert-success');
}
   

  async setCountry (country) {
        await this.country.setValue(country);
    }


 async setSuggestion (expectedText) {
    await browser.waitUntil(
        async () => {
                const suggestionText = await this.suggestions.getText();
                return suggestionText.toLowerCase().includes(expectedText.toLowerCase());

        },
        {
            timeout: 5000,
            timeoutMsg: `No"${expectedText}" `,
        }

    );
 }


 async getSuccessMessage (expectedText) {
    await expect(this.successMessage).toHaveText(
        expect.stringContaining(expectedText),
        {timeout:5000}
    );
 }

}

export default new Confirm();