import {AngularFire, FirebaseListObservable} from "angularfire2";
import {AuthService} from "../../auth/services/auth-service";
import {IAccount} from "../models/account";
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
        console.log(1);
        // todo: check if account$ belongs to the current user
        return this.af.database.list(this.TRANSACTION_PATH, {
            query : {
                orderByChild: "to",
                equalTo: account.$key
            }
        })
    }

    public getOutcomingTransactionsForAccount(account: IAccount): FirebaseListObservable<ITransaction[]>{
        console.log(2);
        // todo: check if account$ belongs to the current user
        return this.af.database.list(this.TRANSACTION_PATH, {
            query : {
                orderByChild: "from",
                equalTo: account.$key
            }
        })
    }

    public getAllIncoming(account: IAccount){

        this.getIncomingTransactionsForAccount(account)
            .scan((x, y) => {
                console.log(x, y);
                return 1;
            }, 0);
    }

    public getAllOutgoing(account: IAccount){
        return this.getIncomingTransactionsForAccount(account)
    }

    public getAccount2Balance(account: IAccount) {

        return Observable.forkJoin([
                this.getIncomingTransactionsForAccount(account),
                this.getOutcomingTransactionsForAccount(account)
            ], (incoming, outcoming) => {
                let totalIncoming = incoming.map((i) => i.amount).reduce((a, b) => a + b, 0);
                let totalOutComming = outcoming.map((i) => i.amount).reduce((a, b) => a + b, 0);
                let result = {
                    account: account.$key,
                    balance: totalIncoming - totalOutComming
                };
                console.log(result);
                return result;
            })
    }

    public getAccountBalance(account: IAccount) {

        return Observable.combineLatest(
            this.getIncomingTransactionsForAccount(account).take(1),
            this.getOutcomingTransactionsForAccount(account).take(1)
        , (incoming, outcoming) => {
                let totalIncoming = incoming.map((i) => i.amount).reduce((a, b) => a + b, 0);
                let totalOutComming = outcoming.map((i) => i.amount).reduce((a, b) => a + b, 0);
                let result = {
                    account: account.$key,
                    balance: totalIncoming - totalOutComming
                };
                console.log(result);
                return result;
            }
        );
    }

    public create(transaction: ITransaction){
        return this.af.database.list(this.TRANSACTION_PATH)
            .push(transaction)
    }

}
