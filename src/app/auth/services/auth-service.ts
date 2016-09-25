import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {FirebaseAuth, FirebaseAuthState, AuthProviders} from 'angularfire2';

@Injectable()
export class AuthService {

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

    loginWithGoogle(){
        return this.login(AuthProviders.Google)
    }

    loginWithTwitter(){
        return this.login(AuthProviders.Twitter)
    }

    private login(provider: AuthProviders) {
        return this.auth$.login(provider)
            .then(()=> this.router.navigate(["/accounts"]))
            .catch(error => console.log('ERROR @ AuthService#signIn() :', error))
    }

    logout() {
        this.auth$.logout();
        this.router.navigate(["/"]);
    }

}
