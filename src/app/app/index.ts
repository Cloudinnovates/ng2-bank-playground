import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {FirebaseModule} from '../firebase';
import {AuthModule} from '../auth';
import {AccountsModule} from "../accounts";
import {ProfileModule} from "../profile";

import {AppComponent} from './components/app';
import {AppHeaderComponent} from './components/app-header';


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
        AuthModule,
        FirebaseModule,
        AccountsModule,
        ProfileModule
    ]
})

export class AppModule {
}
