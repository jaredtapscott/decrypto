import * as functions from 'firebase-functions';
import { Request, Response } from "express";
import * as crypto from 'crypto';
import config from './config';


// create a hexedecimal encoded SHA256 signature of the message
const makeHash = (path: string, method: string) => {
    // get unix time in seconds
    const timestamp = Math.floor(Date.now() / 1000);
    const secret =  new Buffer(config.apiSecret, 'base64');

    const message = timestamp + method + path;
    const signature = crypto.createHmac("sha256", secret).update(message).digest("base64");

    return { 
        signature: signature,
        timestamp: timestamp,
    };
};


/** 
 * CREATES THE REQUEST OBJECT
 * @param {Object} req Contains the method, req, and body.
 * @param {Object} method Contains the "GET", "POST", "PUT", or "DELETE".
*/
export const createRequest = (req:Request) => {
    // sign and timestamp the request
    const hash = makeHash(req.body.path, req.body.method);

    // init new request
    let request:any = {};
    // create the request object
    request.method = req.body.method;
    if (req.body.method === "POST") { request.body = req.body }
    if (req.body.method === "PUT") { request.body = req.body }
    request.headers = {
        Access: "application/json",
        'cb-access-sign': hash.signature,
        'cb-access-timestamp': hash.timestamp.toString(),
        'cb-access-key': config.apiKey,
        'cb-access-passphrase': config.apiPassphrase,
    };
    return request;
}

// Global error handler
export const handleError = ((err: any, res?: Response, ) => {
    if (res) {
        return res.status(500).send({ message: `${err.code} - ${err.message}` });
    } else {
        return functions.logger.log('error logger: ', err);
    }
 });

 // Global logging
 export const logger = ((req: Request ) => {
    // create the logger object
    const data = {
        body: req.body,
        method: req.method,
        params: req.params,
        url: req.url,
    }
    // log this in firebase
    functions.logger.log('logger: ', data);

    return data;
 })

 // Create Response Data Object
 // This is the object that will be sent back to the app
 export const setData = ((req: any, data:any) => {
    // init response object 
    let res:any = {}
    // add log info
    res.log = logger(req);
    // add the data from the API call to the response object
    res.data = data;
    // return object
    return res;
 });
 