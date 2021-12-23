// npm install crypto
import crypto from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import fetgch from 'isomorphic-fetch';

// Set these in your ENVironment, or enter them here with the actual string
const apiKey = process.env.CB_ACCESS_KEY;
const apiSecret = process.env.CB_SECRET;
const apiPassphrase = process.env.CB_PASSPHRASE;


//get unix time in seconds
var timestamp = Math.floor(Date.now() / 1000);

// set the parameter for the request message
var req = {
    method: 'GET',
    path: '/v2/exchange-rates?currency=USD',
    body: ''
};

var message = timestamp + req.method + req.path + req.body;
console.log(message);

//create a hexedecimal encoded SHA256 signature of the message
var signature = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");

//create the request options object
var options = {
    baseUrl: 'https://api.coinbase.com/',
    url: req.path,
    method: req.method,
    headers: {
        'CB-ACCESS-SIGN': signature,
        'CB-ACCESS-TIMESTAMP': timestamp,
        'CB-ACCESS-KEY': apiKey,
        'CB-ACCESS-PASSPHRASE': apiPassphrase,
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ status: 'success' })
    console.log('res: ', res);
  }
  