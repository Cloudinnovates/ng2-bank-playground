import {AngularFireModule, AuthMethods, AuthProviders} from 'angularfire2';


const firebaseConfig = {
    apiKey: "AIzaSyDxWN8ZeFeLR1jVoSeHYXRWURa0ND8UCQU",
    authDomain: "twistbank-80540.firebaseapp.com",
    databaseURL: "https://twistbank-80540.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "628908653925"
};

const firebaseAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Popup,
    remember: 'default'
};

export const FirebaseModule = AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig);
