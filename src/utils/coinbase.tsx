import React from 'react';
import fetch from 'isomorphic-fetch';

// Set these in your ENVironment, or enter them here with the actual string
const apiKey = "ae481bed262b8f1df04a021ba06fc6af";
const apiPassphrase = "r3ct0xl74ae";

const apiUrl = "https://api.exchange.coinbase.com/";

const createRequest = async () => {

    // create a hexedecimal encoded SHA256 signature of the message
    return await fetch('https://us-central1-decrypto-1b1ce.cloudfunctions.net/coinbase-getHash', { method: 'GET' })
        .then((res:any) => {
            return res.json();
        }).then((data:any) => {
        // create the request options object
        return {
            method: "GET",
            headers: {
                Access: "application/json",
                'cb-access-sign': data.signature,
                'cb-access-timestamp': data.timestamp.toString(),
                'cb-access-key': apiKey,
                'cb-access-passphrase': apiPassphrase,
            },
        };
    });
    // const signature = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");

}

const Coinbase = async () => {
    const url = 'https://api.exchange.coinbase.com/accounts';
    return createRequest().then((options:any)=> {
        return fetch(url, options)
            .then((res:any) => {
                return res.json();
            }).then((data:any) => {
                console.log('coinbase data: ', data);
                return data;
            })
            .catch((err:any) => console.error('error: ', err));
    });
};

export default Coinbase;