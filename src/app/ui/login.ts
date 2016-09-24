import { Component } from '@angular/core';
import {UserService} from "../service/user";

@Component({
    selector: "login-form",
    template: `
    <div class="">
    Please log-in
    <button class="btn btn-primary" (click)="login()">Login with <i class="fa fa-google" aria-hidden="true"></i></button>
</div>
`

})
export class LoginComponent {

    constructor(private userService: UserService){}

    login(){
        return this.userService.login()
    }

}
