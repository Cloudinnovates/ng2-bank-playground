import {IAccount, IAccountBalanceInfo} from "./account";
import {Action} from "@ngrx/store";

export const LOAD_ACCOUNTS = "LOAD_ACCOUNTS";
export const LOAD_BALANCE = "LOAD_BALANCE";

export class LoadAccountsAction implements Action {
    type = LOAD_ACCOUNTS;
    payload: IAccount[];
    constructor(payload: IAccount[]){
        this.payload = payload;
    }
}

export class LoadBalanceAction implements Action {
    type = LOAD_BALANCE;
    payload: IAccountBalanceInfo;
    constructor(payload: IAccountBalanceInfo){
        this.payload = payload;
    }
}

export interface AppState {
    accounts: IAccount[]
}
