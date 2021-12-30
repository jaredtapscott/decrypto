// npm install crypto
import * as fetch from 'isomorphic-fetch';
import { Request, Response } from "express";
import { createRequest, handleError, setData } from './utils';
import config from './config';


async function call(req: Request, res: Response) {
    
    // set the url
    let url = config.apiUrl + req.body.path;

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
                let response:any = {}
                response = setData(req, data);
                return res.send(response);   
            })
            .catch((err:any) => handleError(res, err));
    } catch (err) {
        return handleError(res, err);
    }
 



};

const coinbase = {
    call: call,
}

export default coinbase;
