import {Component} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>
`
})
export class AppComponent {

    constructor(af: AngularFire) {

    }
}
