import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {AccountsService} from "../services/account-service";
import {FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {IAccount} from "../models/account";
import {ITransaction} from "../models/transaction";
import {TransactionService} from "../services/transaction-service";
import 'rxjs/add/operator/do';


@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "account-detail",
    template: `
    <div>
        Detail of account <strong>{{ (account$ | async)?.name }}</strong>
        <p>{{ (account$ | async)?.description }}</p>
        <a class="btn btn-primary" [routerLink]="['/accounts/detail/'+(account$ | async)?.$key+'/create-transaction']">
            <i class="fa fa-plus"></i> New transaction
        </a>
        <transaction-list 
          [incomingTransactions]="incomingTransactions"
          [outcomingTransactions]="outcomingTransactions"
          ></transaction-list>
    </div>
`
})
export class AccountDetailComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    account$: FirebaseObjectObservable<IAccount>;
    incomingTransactions: FirebaseListObservable<ITransaction[]>;
    outcomingTransactions: FirebaseListObservable<ITransaction[]>;

    constructor(private activatedRoute: ActivatedRoute,
                private accountService: AccountsService,
                private transactionService: TransactionService){}

    ngOnInit(){
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.account$ = this.accountService.getAccountByKey(param["key"]);
                this.account$.subscribe(account => {
                        this.incomingTransactions = this.transactionService.getIncomingTransactionsForAccount(account);
                        this.outcomingTransactions = this.transactionService.getOutcomingTransactionsForAccount(account);
                    });
            }
        )
    }

    ngOnDestroy(){
        this.subscription.unsubscribe()
    }

}
