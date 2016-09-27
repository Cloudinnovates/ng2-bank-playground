import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {Injectable} from '@angular/core';
import {AuthService} from "../../auth";
import {IAccount} from "../models/account";

import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class AccountsService {


    accounts$: BehaviorSubject<IAccount[]> = new BehaviorSubject([]);

    constructor(private af: AngularFire, private authService: AuthService) {
        
    }

    private getAccountsCollection(){
        return this.af.database.list("/accounts", {
            query: {
                orderByChild: "userId",
                equalTo: this.authService.id
            }
        })
    }

    fetchAccounts() {
         return this.getAccountsCollection();
    }

    createAccount(accountName: string, accountDescription: string) {
        let account: IAccount = {
            name: accountName,
            description: accountDescription,
            userId: this.authService.id
        };
        return this.af.database.list("/accounts")
            .push(account)
    }

    removeAccount(account: IAccount){
        this.getAccountsCollection().remove(account.$key);
    }

    getAccountByKey(key: string): FirebaseObjectObservable<IAccount>{
        return this.af.database.object("/accounts/"+key)
    }

}
