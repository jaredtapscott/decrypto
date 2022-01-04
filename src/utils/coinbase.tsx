import fetch from 'isomorphic-fetch';

const url = 'https://us-central1-decrypto-1b1ce.cloudfunctions.net/api/coinbase';
// const url = 'http://localhost:5001/decrypto-1b1ce/us-central1/api/coinbase';

const apiCall = async (method:string, path:string, bodyObject?:any) => {
    
    // if bodyObject was received then use that
    // if not then create an empty object
    let body = bodyObject?bodyObject:{};
    body.path = path;
    body.method = method;

    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    };
    return fetch(url, options)
        .then((res:any) => {
            return res.json();
        }).then((data: any) => {
            return data.data;
        }).catch((err:any) => {
            console.log('API Call: ', body.api + body.path); 
            console.error('error: ', err)
        });
}

// Just get a list of crypto that I own
const GetCrypto = async (fiat:any) => {
    
    try {

        // get all crypto
        const list = await apiCall('GET', '/accounts', {api: 'pro'});

        // filter out all currency that user does not own
        const filteredList = list.filter((data:any) => data.balance > 0);

        return filteredList;

    } catch(err:any) {
        console.error(err);
    };
};

/**
 * GetPrice
 * @param currency - this should be a cryptocurrency symbol such as 'BTD' or 'ETH' 
 * @param fiat - this should be the fiat currency you want to include such as 'USD' or 'CAD'
 * @param object  - this is optional but if included the pricing data will be added to it and returned
 * @returns - if an 'object' is included then this function will return the object with the pricing data added to it, otherwise it will return just the pricing data
 */
// get the price for a specific coin
const getPrice = async (currency:any, fiat:string, object?:any) => {
    let path = '/prices/' + currency + '-' + fiat + '/spot';
    let res = await apiCall('GET', path, {api: 'v2'});
    // if an object was included in the params then add the price data to the object
    if (object) {
        object.price = res.data.amount;
        object.fiat = res.data.currency;
        // if the object has the current user's balance then calculate the value of the current balance
        if (object.balance) {
            object.value = (object.price * object.balance).toFixed(2);
        }
        return object;
    } else {
        return res.data;
    }
   
};

// give this function an array of objects with a "currency" property and this will
// add the price to each object and return a new object with the new array and with the
// total of all currencies in the array
const addPriceToObjectArray =  (arr:Array<[]>, fiat:string) => {
    let list: Cryptfolio[] = [];
    let total: number = 0;
    let data = {list: list, total: total};
     arr.map(async (item:any, i:number) => {
        // add pricing data to the object
        let newItem = await getPrice(item.currency, fiat, item);
         
        // add item to the data list
        data.list.push(newItem);

        // calculate the total
        data.total = data.total + parseInt(newItem.value);
        
    });
    return data;
}

interface Cryptfolio {
    available: number,
    balance: number,
    currency: string,
    fiat?: string,
    hold: string,
    id: string,
    price?: string,
    profile_id: string,
    trading_enabled: boolean,
    value?: string;
}


// Exports
const api = {
    getCrypto: GetCrypto,
    getPrice: getPrice,
    addPrice: addPriceToObjectArray,
};

export default api;