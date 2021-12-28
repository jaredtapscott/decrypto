import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup,  } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAOaBS-wKFt77uouIIAGJ8rVW6xUZ8bCUo",
    authDomain: "decrypto-1b1ce.firebaseapp.com",
    databaseURL: "https://decrypto-1b1ce-default-rtdb.firebaseio.com",
    projectId: "decrypto-1b1ce",
    storageBucket: "decrypto-1b1ce.appspot.com",
    messagingSenderId: "482880714204",
    appId: "1:482880714204:web:8768f3ce8bebe85ec9cb19",
    measurementId: "G-Z97GNE0Y3R"
  };

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

const getUser = () => {
    const user =  getAuth().currentUser;
    console.log('getuser:', user);
    return user;

}
// Login in call
const Login = async () => {
    // Using a popup.
    provider.addScope('profile');
    provider.addScope('email');
    return signInWithPopup(auth, provider).then((result) => {
        console.log('Who is this? This is ', result.user.displayName);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        return result.user;
    }).catch((err:any) => {
        console.error(err);
        return err.message;
    });
}

// Logout in call
const logout = () => {
    return auth.signOut().then(res => {
        console.log('logout: success');
        return 'success'
    }).catch(err => {
        console.error(err);
        return err;
    });
}

const Auth = {
    login: Login,
    logout: logout,
    getUser: getUser,
}

export default Auth;