import fetch from 'isomorphic-fetch';
import { forEachChild } from 'typescript';

const url = 'https://us-central1-decrypto-1b1ce.cloudfunctions.net/api/coinbase';
// const url = 'http://localhost:5001/decrypto-1b1ce/us-central1/api/coinbase';

const apiCall = async (method:string, path:string, bodyObject?:any) => {
    
    // if bodyObject was received then use that
    // if not then create an empty object
    let body = bodyObject?bodyObject:{};
    body.path = path;
    body.method = method;

    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    };
    return await fetch(url, options)
        .then((res:any) => {
            console.log('status: ', res.status); 
            return res.json();
        }).then((data: any) => {
            return data.data;
        })
        .catch((err:any) => console.error('error: ', err));
}

// Just get a list of crypto that I own
const getCrypto = async () => {
    return await apiCall('GET', '/accounts')
    .then((res:any)=> {
        return res.filter((data:any) => data.balance > 0);
    }).then((list:any) => {
        list = list.map((data:any) => {
            data.details = getCryptoDetails(data.currency).then(details => {
                data.details = details;
                return data;
            });
            return data;
        })
        console.log('list: ', list);
        return list;

    }).catch((err:any) => {
        console.error(err);
    });
};

// Just get a list of crypto that I own
const getCryptoDetails = async (id:string) => {
    let path = '/products/' + id + '-USD';
    return await apiCall('GET', path)
    .then((res:any)=> {
        return res;
    }).catch((err:any) => {
        console.error(err);
    });
};

// Exports
const api = {
    getCrypto: getCrypto,
};

export default api;