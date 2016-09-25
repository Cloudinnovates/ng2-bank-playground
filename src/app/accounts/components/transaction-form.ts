import {Component, OnInit, OnDestroy} from '@angular/core';
import {IAccount} from "../models/account";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountsService} from "../services/account-service";
import {TransactionService} from "../services/transaction-service";
import {FirebaseObjectObservable} from "angularfire2";
import "rxjs"
import {ITransaction} from "../models/transaction";

@Component({
    selector: "transaction-form",
    template: `
<form>
Create transaction from account <strong>{{ currentAccount?.name }}</strong> to 
<label>
    <select 
    name="targetAccount"
    [(ngModel)]="newTransaction.targetAccount"
    >
    <option value="">Please select an account</option>
    <option *ngFor="let acc of possibleTargetAccounts" [ngValue]="acc.$key">{{acc.name}}</option>
</select>
</label>

<label>
    Amount
    <input type="number" name="amount" [(ngModel)]="newTransaction.amount">
</label>

<button (click)="createTransaction()" class="btn btn-primary">Create</button>
</form>

`
})
export class TransactionFormComponent implements OnInit, OnDestroy{

    newTransaction = {
        targetAccount: "",
        amount: 0
    };
    private subscription: Subscription;
    private possibleTargetAccounts: Array<IAccount> = [];
    private currentAccount: IAccount;

    constructor(private activatedRoute: ActivatedRoute,
                private accountService: AccountsService,
                private transactionService: TransactionService,
                private router: Router){}

    createTransaction() {
        let transaction: ITransaction= {
            amount: this.newTransaction.amount,
            from: this.currentAccount.$key,
            to: this.newTransaction.targetAccount
        };
        this.transactionService.create(transaction)
            .then(() => this.router.navigate(["/accounts"]))

    }

    ngOnInit(){
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.accountService.getAccountByKey(param["key"])
                    .subscribe(account => {
                        this.currentAccount = account;
                    });

                this.accountService.accounts$.subscribe(accounts => {
                    for(let account of accounts) {
                        if(account.$key != param["key"]){
                            this.possibleTargetAccounts.push(account);
                        }
                    }
                })
            }
        )
    }

    ngOnDestroy(){
        this.subscription.unsubscribe()
    }

}
