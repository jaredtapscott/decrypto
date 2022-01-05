import { Request, Response } from "express";
import { handleError, setData } from './utils';
import coinbase from './coinbase';

/**
 * @name: getUserCrypto
 * @description: A function to get all crypto from a specific user's account
 * @return: A list of all crypto with pricing filtered to only show the crypto the authenticated user owns
 */

export const getUserCrypto = async (req: Request, res: Response) => {
    try {
        // Create Request Object
        req.body.method = 'GET';
        req.body.path = '/accounts';
        req.body.api = 'pro';
        req.body.internal = true; // tells the api call to return the data to this function instead of send API response (i.e. res.send())


        // get all crypto
        let list:any = await coinbase.call(req, res);
        // filter out all currency that user does not own
        const filteredList = list.data.filter((data:any) => data.balance > 0);
        // add prices
        let priceList:any = await addPriceToObjectArray(filteredList, req.body.fiat, req, res);
        
        priceList.list.then((data:any) => {
            let response = setData(req, data);
            return res.send(response);   
        });


    } catch(err) {
        return handleError(err, res);
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
const getPrice = async (req: Request, res: Response, currency:any, fiat:string, object?:any) => {
    
    let path = '/prices/' + currency + '-' + fiat + '/spot';
 
    // Create Request Object
    req.body.method = 'GET';
    req.body.path = path;
    req.body.api = 'v2';
    
    let pricing:any = await coinbase.call(req, res);
    // if an object was included in the params then add the price data to the object
    if (object) {
        // shorten price down to only 2 decimals (unless that would leave us at $0.00)
        let amount = parseInt(pricing.data.amount).toFixed(2)
        if (amount !== '0.00' ) {
            object.price = amount;
        } else {
            object.price = pricing.data.amount;
        }        
        object.fiat = pricing.data.currency;
        // if the object has the current user's balance then calculate the value of the current balance
        if (object.balance) {
            object.value = (object.price * object.balance).toFixed(2);
        }
        return object;
    } else {
        // cut down to only 2 decimals for the price (unless that would leave us at $0.00)
        let amount = parseInt(pricing.data.amount).toFixed(2)
        if (amount !== '0.00' ) {
            pricing.data.amount = amount;
        }
        return pricing.data;
    }
   
};

// give this function an array of objects with a "currency" property and this will
// add the price to each object and return a new object with the new array and with the
// total of all currencies in the array
const addPriceToObjectArray =  async (arr:Array<[]>, fiat:string, req: Request, res: Response) => {
    let total: number = 0;
    let data = {list: [], total: total};
    let list:any = Promise.all(arr.map(async (item:any, i:number) => {
        // add pricing data to the object
        item = await getPrice(req, res, item.currency, fiat, item);
         
        // calculate the total
        data.total = data.total + parseInt(item.value);
        return item;
    }));
    data.list = list;
    return data;
}

