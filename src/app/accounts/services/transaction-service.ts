
import {AngularFire} from "angularfire2";
import {AuthService} from "../../auth/services/auth-service";
import {IAccount} from "../models/account";
import {Injectable} from "@angular/core";
import {ITransaction} from "../models/transaction";

@Injectable()
export class TransactionService {

    public readonly TRANSACTION_PATH = "/transactions";

    constructor(private af: AngularFire, private authService: AuthService) {}

    public getIncomingTransactionsForAccount(account: IAccount){
        console.log("transactions!");
        // todo: check if account$ belongs to the current user
        return this.af.database.list(this.TRANSACTION_PATH, {
            query : {
                orderByChild: "to",
                equalTo: account.$key
            }
        })
    }

    public getOutcomingTransactionsForAccount(account: IAccount){
        console.log("transactions!");
        // todo: check if account$ belongs to the current user
        return this.af.database.list(this.TRANSACTION_PATH, {
            query : {
                orderByChild: "from",
                equalTo: account.$key
            }
        })
    }

    public create(transaction: ITransaction){
        return this.af.database.list(this.TRANSACTION_PATH)
            .push(transaction)
    }

}
