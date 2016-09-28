import {AngularFire, FirebaseListObservable} from "angularfire2";
import {AuthService} from "../../auth/services/auth-service";
import {IAccount, IAccountBalanceInfo} from "../models/account";
import {Injectable} from "@angular/core";
import {ITransaction} from "../models/transaction";
import "rxjs/add/operator/reduce";
import {Observable} from "rxjs";
import "rxjs/Rx";


@Injectable()
export class TransactionService {

    public readonly TRANSACTION_PATH = "/transactions";

    constructor(private af: AngularFire, private authService: AuthService) {}

    public getIncomingTransactionsForAccount(account: IAccount): FirebaseListObservable<ITransaction[]>{
        // todo: check if account$ belongs to the current user
        return this.af.database.list(this.TRANSACTION_PATH, {
            query : {
                orderByChild: "to",
                equalTo: account.$key
            }
        })
    }

    public getOutcomingTransactionsForAccount(account: IAccount): FirebaseListObservable<ITransaction[]>{
        // todo: check if account$ belongs to the current user
        return this.af.database.list(this.TRANSACTION_PATH, {
            query : {
                orderByChild: "from",
                equalTo: account.$key
            }
        })
    }

    public getAccountBalance(account: IAccount): Observable<IAccountBalanceInfo> {

        return Observable.combineLatest(
            this.getIncomingTransactionsForAccount(account),
            this.getOutcomingTransactionsForAccount(account)
        , (incoming, outcoming) => {
                let totalIncoming = incoming.map((i) => i.amount).reduce((a, b) => a + b, 0);
                let totalOutComming = outcoming.map((i) => i.amount).reduce((a, b) => a + b, 0);
                return {
                    account: account.$key,
                    balance: totalIncoming - totalOutComming
                };
            }
        );
    }

    public create(transaction: ITransaction){
        return this.af.database.list(this.TRANSACTION_PATH)
            .push(transaction)
    }

}
