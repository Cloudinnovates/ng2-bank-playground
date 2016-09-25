import {Component} from '@angular/core';
import {AuthService} from "../services/auth-service";

@Component({
    selector: "login-form",
    template: `
    <div class="">
    Please log-in
    <button class="btn btn-primary" (click)="loginWithGoogle()">Login with <i class="fa fa-google" aria-hidden="true"></i></button>
    <button class="btn btn-primary" (click)="loginWithTwitter()">Login with <i class="fa fa-twitter" aria-hidden="true"></i></button>
</div>
`

})
export class SignInComponent {

    constructor(private authService: AuthService) {
    }

    loginWithGoogle() {
        return this.authService.loginWithGoogle()
    }

    loginWithTwitter() {
        return this.authService.loginWithTwitter()
    }

}
