import {Pipe, PipeTransform} from "@angular/core";
import {AccountsService} from "../services/account-service";

@Pipe({name: "AccountKey"})
export class AccountKeyPipe implements PipeTransform {

    constructor(private accountService: AccountsService){}

    transform(value: string, args: string[]): any {
        if(!value) return value;

        console.log(value);
        return this.accountService.getAccountByKey(value)
            .subscribe(account => {
                console.log(account);
                return account.name;
            });
        // lookup account name by given key
    }

}
