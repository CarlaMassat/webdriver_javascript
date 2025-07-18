import {$, browser, expect} from '@wdio/globals'

class Cart {

 get checkoutCart () {
    return $("*=Checkout");
    }


get navBarTitle () {
    return $$('.navbar-brand');
}


async getCards () {
   return $$("//div[@class='card h-100']");
   
  
}


async getCardsTitle () {
     return $$('h4.card-title a');
     
}


async getCardsButton () {
    return $$('div.card-footer button');
}

async addAllProducts () {
try {

        await browser.waitUntil(async () => {
        const cards = await this.getCards()
         return cards.length > 0;

    },   
    {
        timeout: 10000,
        timeoutMsg: 'products were not found'
    }
)

    const cards = await this.getCards();
     console.log(`Total: ${cards.length}`);

    for(const card of cards) {
        const titleElement = await card.$('h4.card-title a');
        const titleText = await titleElement.getText();
        console.log(`Product added: ${titleText}`);

        const addButton = await card.$('button.btn.btn-info');
        await addButton.click();
        
    }

    console.log('All products added successfully');
    
    
} catch (error) {
    console.log(`Error en addAllProducts: ${error.message}`);
    throw error;
}


}


async addProduct (productName) {

    try {

            await browser.waitUntil(async () => {
        const cards = await this.getCards()
         return cards.length > 0;

    },   
    {
        timeout: 10000,
        timeoutMsg: 'Products not found'
    }
)

     const cards = await this.getCards();

     for(const card of cards) {
        const title = await card.$('h4.card-title a');
        const titleText = await title.getText();

        if (titleText.toLowerCase().includes(productName.toLowerCase())) {
                const addButton = await card.$('button.btn.btn-info');
                await addButton.click();
                return;
            }
     }
         throw new Error(`Product "${productName}" not found.`);
    } 
    
    catch (error) {
        console.log(`Error addProduct: ${error.message}`);
        throw error;
    }
 
}



    async checkout () { 
        await this.checkoutCart.waitForExist(
        {
            timeout: 10000,
            timeoutMsg: 'Checkout button not appeared'
        }
    );
       await this.checkoutCart.click();
    }


    async getCheckoutCount () {
        const text = await this.checkoutCart.getText();
        const match = text.match(/\(\s*(\d+)\s*\)/);

        if (!match) throw new Error('No counter was found');
            return parseInt(match[1],10);
        
    }
}

export default new Cart();