import {$, browser, expect} from '@wdio/globals'

class Review {

    get totalProduct () {
        return $('h3 strong');
    }

  

    get continueShopping () {
        return $('.btn-default');
    }

    async getProductPricesElements() {
    return await $$('//tr/td[4]/strong');
    }

    
   
    async getProductPrices () {
        const elements = await this.getProductPricesElements();

        const plainArray = Array.from(elements)
        return Promise.all(plainArray.map(async el => {
            const text = await el.getText();
            return parseFloat(text.replace(/[^\d]/g, ''));
        }));
    }

   
    async getDisplayedTotal () {
        const totalElement = await this.totalProduct;
        const totalText = await totalElement.getText();
        return parseFloat(totalText.replace(/[^\d]/g, ''));
    }
    
  
}

export default new Review ();