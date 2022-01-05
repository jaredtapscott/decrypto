import * as fetch from 'isomorphic-fetch';
import { Request, Response } from "express";
import { createRequest, handleError, setData } from './utils';
import config from './config';
import {getUserCrypto} from './portfolio';

/**
 * Default Coinbase API call
 * @param req server request
 * @param res server response
 * @param internal {boolean} Used to return the data normally instead of sending express api response (i.e. res.send())
 * @returns 
 */
async function call(req: Request, res: Response) {

    // set the url
    let url:string;
    if (req.body.api === 'pro'){
        // if we're using the coinbasePro api then use this url
        url = config.apiUrlPro + req.body.path;
        
    } else {
        // if we're using the regular old coinbase v2 api then use this url
        url = config.apiUrl + req.body.path;
    }

    try {

        // if path is missing from body object throw an warning
        if (!req.body.path) {
            return res.status(400).send({ message: 'Missing path field in request body.' })
        }

        // init the request
        let request = createRequest(req);

        // call the coinbase api
        return await fetch(url, request)
            .then((data:any) => {
                return data.json();
            }).then((data:any) => {
                // let response = setData(req, data);
                let response = setData(req, data);
                // if this is an internal api call (i.e. not from a web or mobile app) then just return the response
                if (req.body.internal) {
                    return response;
                } else {
                    // if this is an external api call then send api response 
                    return res.send(response);   
                }
            })
            .catch((err:any) => handleError(err, res));
    } catch (err) {
        return handleError(err, res);
    }
    
};

const coinbase = {
    call: call,
    getCrypto: getUserCrypto
}

export default coinbase;
