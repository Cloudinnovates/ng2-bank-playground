export interface ITransaction {
    amount: number;
    from: string;
    to: string;
    createdAt?: number;
}

export class Transaction implements ITransaction {
    amount: number;
    from: string;
    to: string;
    createdAt: number = firebase.database['ServerValue']['TIMESTAMP'];

}
