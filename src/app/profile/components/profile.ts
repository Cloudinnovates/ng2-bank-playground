import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {ILocationPoint} from "../models/user";
import {AppState} from "../../app/index";
import {SaveUserLocationAction} from "../models/actions";

@Component({
    template: `
    This is your profile
    <profile-map
        (updateCurrentLocation)="onLocationUpdate($event)"
        [currentLocation]="currentLocation$"
        
    ></profile-map>
`

})
export class ProfileComponent {

    currentLocation$: Observable<ILocationPoint>;

    constructor(private _store: Store<AppState>){
        this.currentLocation$ = this._store.select(state => {
            return state.Profile.location;
        })

    }


    onLocationUpdate($event) {
        this._store.dispatch(new SaveUserLocationAction($event));
    }

}
