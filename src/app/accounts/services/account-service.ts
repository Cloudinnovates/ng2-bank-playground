import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {Injectable} from '@angular/core';
import {AuthService} from "../../auth";
import {IAccount} from "../models/account";

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {Store} from "@ngrx/store";
import {LoadAccountsAction, LoadBalanceAction, AccountCreateAction} from "../models/actions";
import {TransactionService} from "./transaction-service";
import {AppState} from "../../app/index";

@Injectable()
export class AccountsService {


    accounts$: BehaviorSubject<IAccount[]> = new BehaviorSubject([]);
    accountsLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private af: AngularFire,
        private authService: AuthService,
        private _store: Store<AppState>,
        private transactionService: TransactionService
    ) {}

    private getAccountsCollection(){
        return this.af.database.list("/accounts", {
            query: {
                orderByChild: "userId",
                equalTo: this.authService.id
            }
        })
    }

    fetchAccounts() {
        this.accountsLoading$.next(true);
         return this.getAccountsCollection()
            .subscribe(data=>{
                this._store.dispatch(new LoadAccountsAction(data));
                this.accountsLoading$.next(false);
                data.forEach((account: IAccount)=> {
                    this.transactionService.getAccountBalance(account).subscribe(accountInfo => {
                        this._store.dispatch(new LoadBalanceAction(accountInfo));
                    });
            })
        });
    }

    createAccount(accountName: string, accountDescription: string) {
        let account: IAccount = {
            name: accountName,
            description: accountDescription,
            userId: this.authService.id
        };
        return this.af.database.list("/accounts")
            .push(account).then(account => {
                this._store.dispatch(new AccountCreateAction(account))
            })
    }

    removeAccount(account: IAccount){
        this.getAccountsCollection().remove(account.$key);
    }

    getAccountByKey(key: string): FirebaseObjectObservable<IAccount>{
        return this.af.database.object("/accounts/"+key)
    }

}
