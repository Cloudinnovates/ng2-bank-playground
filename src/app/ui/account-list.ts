import { Component, OnInit } from '@angular/core';
import {AccountsService, IAccount} from "../service/accounts";
import {FirebaseListObservable} from "angularfire2";

@Component({
    selector: "account-list",
    template:
`
<div class="row">
    <a class="btn btn-success" [routerLink]="['', 'create-account']"><i class="fa fa-plus"></i> create account</a>
</div>
<div class="row">
    <div class="alert alert-info">You don't have any account</div>
    <div>
        Your accounts:
        <ul class="list-group">
            <li class="list-group-item" *ngFor="let account of accounts | async">
                <strong>Name: </strong>{{ account.name }} <br>
                <p>{{ account.description }}</p>
             </li>
        </ul>        
    </div>
</div>
`
})
export class AccountList implements OnInit{

    accounts:FirebaseListObservable<IAccount[]>;
    constructor(private accountsService: AccountsService){}

    ngOnInit(){
        this.accounts = this.accountsService.getAccounts();
    }

}
