import {ActionReducer, Action} from "@ngrx/store";
import {LOAD_ACCOUNTS, LOAD_BALANCE, ADD_ACCOUNT} from "./actions";
import {IAccount} from "./account";


export interface AccountsAppState {
    accounts: IAccount[]
}

const initialState : AccountsAppState = {
    accounts: []
};

const accountBalanceReducer = (state, action: Action) => {
    switch(action.type) {
        case LOAD_BALANCE:
            return state.map(account => {
                    if(account.$key === action.payload.account){
                        return Object.assign({}, account, {
                            balance: action.payload.balance
                        });
                    }
                    return account;
                });
        case ADD_ACCOUNT:
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
};

export const accountsReducer: ActionReducer<AccountsAppState> = (state: AccountsAppState = initialState, action: Action) => {
    console.log("Action: ", action, "State: ", state);
    switch (action.type){
        case LOAD_ACCOUNTS:
            return {
                accounts: action.payload
            };
        case LOAD_BALANCE:
            return Object.assign({}, state, {
                accounts: accountBalanceReducer(state.accounts, action)
            });
        case ADD_ACCOUNT:
            return Object.assign({}, state, {
                accounts: accountBalanceReducer(state.accounts, action)
            });
        case "REMOVE_ACCOUNT":
            return state;
        default:
            return state;
    }
};
