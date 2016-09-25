export interface ITransaction {
    createdAt?: number,
    amount: number,
    from: string,
    to: string
}

export class Transaction implements ITransaction {
    amount: number;
    from: string;
    to: string;
    createdAt: number = firebase.database['ServerValue']['TIMESTAMP'];

}
