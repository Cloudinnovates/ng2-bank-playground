import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {FirebaseModule} from '../firebase';
import {AuthModule} from '../auth';
import {AccountsModule} from "../accounts";
import {ProfileModule} from "../profile";

import {AppComponent} from './components/app';
import {AppHeaderComponent} from './components/app-header';
import {StoreModule, combineReducers} from "@ngrx/store";
import {accountsReducer, AccountsAppState} from "../accounts/models/reducer";
import {userReducer, ProfileAppState} from "../profile/models/reducer";

export interface AppState {
    Account: AccountsAppState,
    Profile: ProfileAppState
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent,
        AppHeaderComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], {useHash: false}),
        StoreModule.provideStore(combineReducers({
            Account: accountsReducer,
            Profile: userReducer})),
        AuthModule,
        FirebaseModule,
        AccountsModule,
        ProfileModule
    ]
})

export class AppModule {
}
