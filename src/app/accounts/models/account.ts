export interface IAccount {
    $key?: string,
    name: string,
    description: string,
    userId?: string
    createdAt?: number
}

class Account implements IAccount {
    $key?: string;
    name: string;
    description: string;
    userId: string;
    balance?: number;
    createdAt: number = firebase.database['ServerValue']['TIMESTAMP'];

    constructor(name: string, description: string){
        this.name = name;
        this.description = description;
    }

}

export interface IAccountBalanceInfo {
    account: string;
    balance: number;
}
