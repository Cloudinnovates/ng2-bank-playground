import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from "@angular/router"

/*
* App stuff
* */

import {AppComponent} from './app.component';
import * as containers from "./containers"
import * as uis from "./ui"
import * as services from "./service"
import { routes } from "./routes"

const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);



import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';

const ServiceConfig = {
    apiKey: "AIzaSyDxWN8ZeFeLR1jVoSeHYXRWURa0ND8UCQU",
    authDomain: "twistbank-80540.firebaseapp.com",
    databaseURL: "https://twistbank-80540.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "628908653925"
};

const AuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Popup
};


@NgModule({
    declarations: [
        AppComponent,
        ...mapValuesToArray(containers),
        ...mapValuesToArray(uis),

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AngularFireModule.initializeApp(ServiceConfig, AuthConfig),
        RouterModule.forRoot(routes)
    ],
    providers: [
        ...mapValuesToArray(services),
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
