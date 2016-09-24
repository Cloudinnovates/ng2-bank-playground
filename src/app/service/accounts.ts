import { AngularFire} from 'angularfire2';
import { Injectable } from '@angular/core';
import {UserService} from "./user";

export interface IAccount {
    name: string,
    description: string,
    userId?: string
    createdAt?: string
}


@Injectable()
export class AccountsService {
    constructor(private af: AngularFire, private userService: UserService){}

    getAccounts() {
        return this.af.database.list("/accounts")
    }

    createAccount(accountName: string, accountDescription: string) {
        let account: IAccount = {
            name: accountName,
            description: accountDescription,
            userId: this.userService.id
        };
        return this.af.database.list("/accounts")
            .push(account)
    }
}
