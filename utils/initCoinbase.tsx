// npm install crypto
import crypto from 'crypto';
import 'isomorphic-fetch';


// Set these in your ENVironment, or enter them here with the actual string
const apiKey = '9ce47f0d756557653a7066deabe0706b';
const apiSecret = 'KkyT9TayF72U4N062T6OCY+d94eXicejtlEmeXfpgJlLtsvOLiKzUQCCk8FnAi+Rg0bwDr8QB9me68hnw2X77Q==';
const apiPassphrase = 'isgli1czcw';

const apiUrl = 'https://api.exchange.coinbase.com/';

const req = {
    method: 'GET',
    path: 'accounts',
    body: ''
};

//get unix time in seconds
var timestamp = Math.floor(Date.now() / 1000);

// set the parameter for the request message
const url = apiUrl + req.path;

var message = timestamp + req.method + req.path + req.body;

//create a hexedecimal encoded SHA256 signature of the message
var signature = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");
console.log('sig', signature);

//create the request options object
var options = {
    method: req.method,
    headers: {
        Access: 'application/json',
        cb_access_sign: signature,
        cb_access_timestamp: timestamp.toString(),
        cb_access_key: apiKey,
        cb_access_passphrase: apiPassphrase,
    }
};


  

const CoinbaseAPI = async () => {
    fetch(url, options)
        .then((res:any) => {
            res.json()
            console.log('res: ', res.json());
        })
        .catch((err:any) => console.error('error: ', err));
    return (
        <div>
            <h3>Coinbase API</h3>
        </div>
    )
};

export default CoinbaseAPI;