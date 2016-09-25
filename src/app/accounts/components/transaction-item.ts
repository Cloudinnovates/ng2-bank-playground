import { Component, Input } from '@angular/core';
import {ITransaction} from "../models/transaction";

@Component({
    selector: "transaction-item",
    template: `
    <div>
    Transaction
    </div>

`
})
export class TransactionItemComponent {
    @Input() transaction: ITransaction;
}
