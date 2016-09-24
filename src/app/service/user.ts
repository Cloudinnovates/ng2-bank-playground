import {Injectable} from "@angular/core";
import {FirebaseAuth, FirebaseAuthState, AuthProviders} from 'angularfire2';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    private authState: FirebaseAuthState = null;

    constructor(public auth$: FirebaseAuth, private router: Router) {
        auth$.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
        });
    }

    get authenticated(): boolean {
        return this.authState !== null;
    }

    get id(): string {
        return this.authenticated ? this.authState.uid : '';
    }

    get name(): string {
        return this.authenticated ? this.authState.auth.providerData[0].displayName : '';
    }

    login() {
        return this.auth$.login()
            .then(()=> this.router.navigate(["/"]))
            .catch(error => console.log('ERROR @ AuthService#signIn() :', error))
    }

    logout() {
        this.auth$.logout();
        this.router.navigate(["/auth"]);
    }

}


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.auth$
      .take(1)
      .map(authState => !!authState)
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/auth']);
        }
      });
  }
}
