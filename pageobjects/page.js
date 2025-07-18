
import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/


//config();

export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */


  
    open (path = '' ) {
         
        const cleanPath = path.replace(/^\/+/, '');
        const baseUrl = browser.options.baseUrl.replace(/\/+$/, ''); 
        const url = cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;  
        return browser.url(url);

    }
}
