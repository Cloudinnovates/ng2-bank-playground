import {ActionReducer, Action} from "@ngrx/store";
import {AppState, LOAD_ACCOUNTS, LOAD_BALANCE} from "./actions";


export const accountsReducer: ActionReducer<AppState> = (state: AppState = {accounts: []}, action: Action) => {
    console.log("Action: ", action, "State: ", state);
    switch (action.type){
        case LOAD_ACCOUNTS:
            return {
                accounts: action.payload
            };
        case LOAD_BALANCE:
            return Object.assign({}, state, {
                accounts: state.accounts.map(account => {
                    if(account.$key === action.payload.account){
                        return Object.assign({}, account, {
                            balance: action.payload.balance
                        });
                    }
                    return account;
                })
            });
        case "REMOVE_ACCOUNT":
            return state;
        case "ADD_ACCOUNT":
            return state;
        default:
            return state;
    }

}
