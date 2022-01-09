import { Application } from "express";
import { isAuthenticated } from "../auth";
import coinbase from './coinbase-pro';

export function coinbaseRoutesConfig(app: Application) {
    app.post('/coinbase',
        isAuthenticated,
        coinbase.call
    );
    app.post('/coinbase/crypto',
        isAuthenticated,
        coinbase.getCrypto
    );
 }
 