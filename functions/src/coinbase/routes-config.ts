import { Application } from "express";
import coinbase from './coinbase';

export function coinbaseRoutesConfig(app: Application) {
    app.post('/coinbase',
        coinbase.call
    );
    app.post('/coinbase/crypto',
        coinbase.getCrypto
    );
 }
 