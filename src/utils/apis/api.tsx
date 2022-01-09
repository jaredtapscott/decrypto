import fetch from 'isomorphic-fetch';
import { getAuth } from "firebase/auth";
  
const url = 'https://us-central1-decrypto-1b1ce.cloudfunctions.net/api/coinbase';
// const url = 'http://localhost:5001/decrypto-1b1ce/us-central1/api/coinbase';

export const getToken = async () => {
    const auth:any = getAuth();
    return await auth.currentUser.getIdToken(true).then(function(idToken:string) {
        // Send token to your backend via HTTPS
        const token = 'Bearer ' + idToken;
        return token;
      }).catch(function(error:any) {
        // Handle error
        console.error(error);
      });
      
}

export const apiCall = async (method:string, path:string, bodyObject?:any) => {
    
    // if bodyObject was received then use that
    // if not then create an empty object
    let body = bodyObject?bodyObject:{};
    body.path = path;
    body.method = method;

    // get access token
    let token = await getToken();
    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        }
    };
    
    try {
        return fetch(url, options)
            .then((res:any) => {
                return res.json();
            }).then((data: any) => {
                return data.data;
            }).catch((err:any) => {
                console.log('API Call: ', body.api + body.path); 
                console.error('error: ', err)
            });
    } catch (err) {
        console.error('error: ', err)
    }
}
