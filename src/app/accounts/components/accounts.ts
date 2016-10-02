import { Component, OnInit } from '@angular/core';
import {AccountsService} from "../services/account-service";
import { Store } from '@ngrx/store';
import {Observable, BehaviorSubject} from "rxjs";

import {AppState} from "../../app/index";
import {AccountsAppState} from "../models/reducer";


@Component({
    template: `
    <div class="row">
        <div class="col-md-10">
            <account-list 
            [accounts]="accounts | async"
            [accountsLoadingInProgress]="accountsService.accountsLoading$ | async"
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

    accounts: Observable<{}>;


    constructor(public accountsService: AccountsService, private _store: Store<AppState>){
        this.accounts = _store.select(state => {
            return state.Account.accounts;
        });
    }

    ngOnInit() {

        // fetch accounts data
        this.accountsService.fetchAccounts()
    }
}
