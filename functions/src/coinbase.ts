// npm install crypto
import * as functions from 'firebase-functions';
import * as crypto from 'crypto';
import * as cors from 'cors';
import * as fetch from 'isomorphic-fetch';

cors({ origin: '*' });

// Set these in your ENVironment, or enter them here with the actual string
const apiKey = "ae481bed262b8f1df04a021ba06fc6af";
const apiSecret = "uaSCr0mOyb5zU43AP6r5WHvtzUWT7x7DpxAHcX2b8nB66xTzoP5sTM0HdPiXkT4Vy0tZuMGP/aLho3Fe/ADthw==";
const apiPassphrase = "r3ct0xl74ae";

const apiUrl = "https://api.exchange.coinbase.com/";

// create a hexedecimal encoded SHA256 signature of the message
const MakeHash = functions.https.onRequest((req, res) => {
    // set cors headers
    res.set('Access-Control-Allow-Origin', '*');
    // get unix time in seconds
    const timestamp = Math.floor(Date.now() / 1000);
    const secret = new Buffer(apiSecret, 'base64');

    const message = timestamp + 'GET' + '/accounts';
    const signature = crypto.createHmac("sha256", secret).update(message).digest("base64");
    res.send({ 
        signature: signature,
        timestamp: timestamp,
    });
});

const createRequest = () => {
    // create the request options object
    let req : any = {
        url: "accounts",
        method: "GET",
        body: "",
    };

    // get unix time in seconds
    const timestamp = Math.floor(Date.now() / 1000);

    const message = timestamp + req.method + req.url + req.body;

    // create a hexedecimal encoded SHA256 signature of the message
    const signature = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");
    console.log("sig", signature);

    // create the request options object
    return req = {
        method: "GET",
        headers: {
            Access: "application/json",
            'cb-access-sign': signature,
            'cb-access-timestamp': timestamp.toString(),
            'cb-access-key': apiKey,
            'cb-access-passphrase': apiPassphrase,
        },
    };
}

const GetAccount = functions.https.onRequest((req, res) => {
    // set cors headers
    res.set('Access-Control-Allow-Origin', '*');
    // init the request
    let request = createRequest();
    let url = apiUrl + 'accounts';

    functions.logger.info("Coinbase!", {structuredData: true});
    console.log("res: ", res);
    // call the coinbase api
    fetch(url, request)
    .then((data:any) => {
        console.log('data: ', data);
        res.send(data);
    })
    .catch((err:any) => console.error('error: ', err));
});

module.exports = {
    getAccount: GetAccount,
    getHash: MakeHash,
}