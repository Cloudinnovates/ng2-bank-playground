import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {Injectable} from '@angular/core';
import {AuthService} from "../../auth";
import {IAccount} from "../models/account";

@Injectable()
export class AccountsService {

    accounts$: FirebaseListObservable<IAccount[]>;

    constructor(private af: AngularFire, private authService: AuthService) {
        this.accounts$ = this.af.database.list("/accounts", {
            query: {
                orderByChild: "userId",
                equalTo: authService.id
            }
        });
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
        return this.accounts$.remove(account.$key);
    }

    getAccountByKey(key: string): FirebaseObjectObservable<IAccount>{
        return this.af.database.object("/accounts/"+key)
    }

}
