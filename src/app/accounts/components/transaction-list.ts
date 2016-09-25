import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {FirebaseListObservable} from "angularfire2";
import {ITransaction} from "../models/transaction";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "transaction-list",
    template: `
    <div class="col-md-6">
        <h4>Incoming Transactions:</h4>
        <alert [message]="'No Transaction'" *ngIf="(incomingTransactions | async)?.length == 0"></alert>
        <ul class="list-group">
            <li class="list-group-item"
                *ngFor="let transaction of incomingTransactions | async"    
            >
            <strong>To:</strong> {{ transaction.to }}<br>
            <strong>Amount:</strong> {{ transaction.amount }}
            </li>
        </ul>
    </div>
    
    
    <div class="col-md-6">
        <h4>Outcomming Transactions:</h4>
        <ul class="list-group">
            <li class="list-group-item"
                *ngFor="let transaction of outcomingTransactions | async"    
            >
            <strong>From:</strong> {{ transaction.from }}<br>
            <strong>Amount:</strong> {{ transaction.amount }}
            </li>
        </ul>
    </div>
`
})
export class TransactionListComponent {
    @Input() incomingTransactions: FirebaseListObservable<ITransaction[]>;
    @Input() outcomingTransactions: FirebaseListObservable<ITransaction[]>;

}
