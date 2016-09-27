import { Component, OnInit } from '@angular/core';
import {AccountsService} from "../services/account-service";

@Component({
    template: `
    <div class="row">
        <div class="col-md-10">
            <account-list 
            [accounts]="accountsService.accounts$ | async" 
            (remove)="accountsService.removeAccount($event)">    
            </account-list>    
        </div>
        <div class="col-md-2">
            <a class="btn btn-success" [routerLink]="['/accounts/create']"><i class="fa fa-plus"></i> create account</a>
        </div>
    </div>    
`

})
export class AccountsComponent implements OnInit {

    constructor(public accountsService: AccountsService){}

    ngOnInit() {
        // fetch accounts data
        this.accountsService.fetchAccounts();
    }
}
