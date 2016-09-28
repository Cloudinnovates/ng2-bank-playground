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
        
        <ul class="list-group" *ngIf="accountsLoadingInProgress">
            <li class="list-group-item">
                <div style="background: #eaeaea;"><br></div>
                <br>
                <div style="background: #eaeaea; width: 70%"><br></div>
                <br><br>
                <div style="background: #eaeaea; width: 30%"><br></div>
            </li>
        </ul>
        
        <ul class="list-group">
            <li class="list-group-item" *ngFor="let account of _accounts;trackBy:identify;let i=index" highlight>
              
                <div class="pull-right">
                    <a (click)="remove.emit(account)"><i class="fa fa-trash"></i></a>
                </div>
                <div class="pointer" [routerLink]="['/accounts/detail/'+account.$key]">
                    <strong>Name: </strong>{{ account.name }} ({{ account.$key }})<br>
                    <p>{{ account.description }}</p><br>
                    <p>Balance: {{ account.balance }}</p>  
                </div>
            </li>
        </ul>        
`
})
export class AccountListComponent {

    @Input() accountsLoadingInProgress;
    @Input() set accounts(value) {
        this._accounts = value;
    }

    _accounts: IAccount[] = [];

    @Output() remove = new EventEmitter();

    identify(index, item: IAccount) {
        //do what ever logic you need to come up with the unique identifier of your item in loop, i will just return the object id.
        return item.name;
    }

}
