import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../auth';
import {AccountsService} from "./services/account-service";
import {AccountsComponent} from "./components/accounts";
import {AccountListComponent} from "./components/account-list";
import {AccountFormComponent} from "./components/account-form";
import {AccountDetailComponent} from "./components/account-detail";
import {HighlightDirective} from "./directives/highlight-directive";
import {TransactionService} from "./services/transaction-service";
import {TransactionListComponent} from "./components/transaction-list";
import {TransactionFormComponent} from "./components/transaction-form";
import {AccountKeyPipe} from "./directives/account-key";
import {SharedModule} from "../shared/index";

import {StoreModule} from "@ngrx/store"
import {accountsReducer} from "./models/reducer";

const routes: Routes = [
    {path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard]},
    {path: 'accounts/create', component: AccountFormComponent, canActivate: [AuthGuard]},
    {path: 'accounts/detail/:key', component: AccountDetailComponent, canActivate: [AuthGuard]},
    {path: 'accounts/detail/:key/create-transaction', component: TransactionFormComponent, canActivate: [AuthGuard]}
];


@NgModule({
    declarations: [
        AccountsComponent,
        AccountListComponent,
        AccountFormComponent,
        AccountDetailComponent,
        HighlightDirective,
        TransactionListComponent,
        TransactionFormComponent,
        AccountKeyPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        AccountsService,
        TransactionService
    ]
})

export class AccountsModule {
}

