import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

import {FirebaseListObservable} from "angularfire2";
import {IAccount} from "../models/account";
import {TransactionService} from "../services/transaction-service";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "account-list",
    template: `
        <alert 
            *ngIf="(accounts | async)?.length==0" 
            [message]="'You don\\'t have any account'">
        </alert>
        
        <ul class="list-group">
            <li class="list-group-item" *ngFor="let account of accounts | async" highlight>
                {{ (transactionService.getAccountBalance(account) | async )?.balance }}
                
                <div class="pull-right">
                    <a (click)="remove.emit(account)"><i class="fa fa-trash"></i></a>
                </div>
                <div class="pointer" [routerLink]="['/accounts/detail/'+account.$key]">
                    <strong>Name: </strong>{{ account.name }} ({{ account.$key }})<br>
                    <p>{{ account.description }}</p><br>
                    <p>Balance: </p>
                </div>
             </li>
        </ul>        
`
})
export class AccountListComponent {

    constructor(public transactionService: TransactionService){}

    @Input() accounts: FirebaseListObservable<IAccount[]>;

    @Output() remove = new EventEmitter();

}
