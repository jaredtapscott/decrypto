import { Request, Response } from "express";

import * as coinbase from 'coinbase';
import * as functions from 'firebase-functions';

// doc: https://github.com/coinbase/coinbase-node
// initialize the client
let client = new coinbase.Client({
    apiKey: functions.config().coinbase.key,
    apiSecret: functions.config().coinbase.secret
})

export async function getAccount(req: Request, res: Response) {
    return client.getAccount('BTC', (err:any, account:any) => {});
}


