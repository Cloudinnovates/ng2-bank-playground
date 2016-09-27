import {Component, Input, Output, EventEmitter} from '@angular/core';

import {FirebaseListObservable} from "angularfire2";
import {IAccount} from "../models/account";
import {TransactionService} from "../services/transaction-service";

@Component({
    selector: "account-list",
    template: `
        <alert 
            *ngIf="accounts?.length==0" 
            [message]="'You don\\'t have any account'">
        </alert>
        
        <ul class="list-group">
            <li class="list-group-item" *ngFor="let account of _accounts;trackBy:identify;let i=index" highlight>
              
                <div class="pull-right">
                    <a (click)="remove.emit(account)"><i class="fa fa-trash"></i></a>
                </div>
                <div class="pointer" [routerLink]="['/accounts/detail/'+account.$key]">
                    <strong>Name: </strong>{{ account.name }} ({{ account.$key }})<br>
                    <p>{{ account.description }}</p><br>
                    <p>Balance: {{ _balances[i]?.balance }}</p>  
                </div>
            </li>
        </ul>        
`
})
export class AccountListComponent {


    @Input() set accounts(value) {
        this._accounts = value;
        this.getBalances();
    }

    _accounts: IAccount[] = [];
    _balances: {account: string, balance: number}[] = [];

    @Output() remove = new EventEmitter();

    constructor(public transactionService: TransactionService) {
    }

    identify(index, item: IAccount) {
        //do what ever logic you need to come up with the unique identifier of your item in loop, i will just return the object id.
        return item.name;
    }

    getBalances() {
        this._accounts.forEach((value, index)=> {
            this.transactionService.getAccountBalance(value).subscribe(value=> {
                this._balances[index] = value;
            });
        });
    }

}
