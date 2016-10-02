///<reference path="actions.ts"/>
import {ActionReducer, Action} from "@ngrx/store";
import {SAVE_USER_LOCATION, LOAD_USER_PROFILE} from "./actions";
import {IUser} from "./user";

export interface ProfileAppState {
    user: IUser;
}


const initialState: ProfileAppState = {
    user: {}
};

export const userInfoReducer = (state, action:Action) => {
    switch (action.type) {
        case SAVE_USER_LOCATION:
            return Object.assign({}, state, {
                location: {
                    lat: action.payload.lat,
                    lng: action.payload.lng,
                }
            })
    }
};

export const userReducer: ActionReducer<ProfileAppState> = (state: ProfileAppState = initialState, action: Action) => {
    console.log("Action: ", action, "State: ", state);
    switch (action.type){
        case LOAD_USER_PROFILE:
            return {
                user: action.payload
            };
        case SAVE_USER_LOCATION:
            return Object.assign({}, state, {
                user: userInfoReducer(state.user, action)
            });
        default:
            return state;

    }
};
