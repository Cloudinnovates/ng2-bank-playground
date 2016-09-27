import {IAccount} from "./models/account";

const LOAD_ACCOUNTS = "LOAD_ACCOUNTS";

export class LoadAccountsAction {
    type = LOAD_ACCOUNTS;
    payload: IAccount[];
    constructor(payload: IAccount[]){
        this.payload = payload;
    }
}

export interface AppState {
    accounts: IAccount[]
}

export const accounts = (state = [], action) => {
    switch (action.type){
        case LOAD_ACCOUNTS:
            return state.concat(action.payload);
        case "LOAD_BALANCE":
            return state;
        case "REMOVE_ACCOUNT":
            return state;
        case "ADD_ACCOUNT":
            return state;
        default:
            return state;
    }

}
