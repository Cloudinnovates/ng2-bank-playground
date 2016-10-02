import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../auth';
import {ProfileComponent} from "./components/profile";
import {ProfileMapComponent} from "./components/profile-map";
import {MapService} from "./service/map-service";
import {userReducer} from "./models/reducer";
import {StoreModule} from "@ngrx/store";


const routes: Routes = [
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];


@NgModule({
    declarations: [
        ProfileComponent,
        ProfileMapComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        MapService
    ]
})

export class ProfileModule {
}

