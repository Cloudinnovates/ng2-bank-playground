import {Component, Input} from '@angular/core';

@Component({
    selector: "alert",
    template: `
        <div class="alert" [ngClass]="{'alert-{type}': type, 'alert-info': !type}">
            {{ message }}
        </div>
`
})
export class AlertComponent {
    @Input() message: string;
    @Input() type: string|undefined;
}
