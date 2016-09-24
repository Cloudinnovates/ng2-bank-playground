import { Component, Output, EventEmitter } from '@angular/core';
import {Router} from "@angular/router";
import {AccountsService} from "../service/accounts";


@Component({
    selector: "account-create",
    template: `
    <form class="form">
        <label>
        Account name
            <input 
             type="text" 
             name="newAccount.name"
             [(ngModel)]="newAccount.name"
            />
        </label>
        <label>
        Account Description
            <input 
            type="text" 
            name="newAccount.description" 
             [(ngModel)]="newAccount.description"
            />
        </label>
        <a (click)="createAccount()" class="btn btn-success">Create</a>
        <a [routerLink]="['']" class="btn btn-danger">Cancel</a>
    </form>

`
})
export class AccountCreateForm {
    newAccount = {
        name: "",
        description: ""
    };

    constructor(private accounts:AccountsService, private router: Router){}

    createAccount(){
        const {name, description} = this.newAccount;
        if (name && description) {
           this.accounts.createAccount(name, description)
               .then(() => this.router.navigate([""]))

        }
    }

}
