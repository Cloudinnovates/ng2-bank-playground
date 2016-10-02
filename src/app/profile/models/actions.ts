
import {Action} from "@ngrx/store";
import {IUser, ILocationPoint} from "./user";
export const LOAD_USER_PROFILE = "LOAD_USER_PROFILE";
export const SAVE_USER_LOCATION = "SAVE_USER_LOCATION";

export class LoadUserProfileAction implements Action {
    type = LOAD_USER_PROFILE;
    payload: IUser;
    constructor(payload: IUser){
        this.payload = payload;
    }
}

export class SaveUserLocationAction implements Action {
    type = SAVE_USER_LOCATION;
    payload: ILocationPoint;
    constructor(payload: ILocationPoint){
        this.payload = payload;
    }
}
