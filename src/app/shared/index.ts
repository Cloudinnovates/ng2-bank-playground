import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AlertComponent} from "./components/alert-box";

@NgModule({
    declarations: [
        AlertComponent,
    ],
    imports: [
        CommonModule,
    ],
    providers: [],
    exports: [
        AlertComponent,
    ]
})

export class SharedModule {
}

