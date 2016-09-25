import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/auth-service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate(): Observable<boolean> {
        return this.auth.auth$
            .take(1)
            .map(authState => !!authState)
            .do(authenticated => {
                if (!authenticated) {
                    this.router.navigate(['/']);
                }
            });
    }
}
