import { Component } from '@angular/core';
import {UserService} from "../service";
import {Router} from "@angular/router";

@Component({
    selector: "app-bar",
    template:
`
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Bank</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Bank</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li [routerLink]="['']" routerLinkActive="active"><a href="#" >My Account</a></li>
            </ul>
            
            <ul class="nav navbar-nav navbar-right">
                <li><a>{{ userService.name }}</a></li>
                <li><a href="#" (click)="logout()">Logout</a></li>
            </ul>
        </div><!-- /.navbar-collapse -->
        
    </div><!-- /.container-fluid -->
</nav>
`
})
export class AppBar {

    constructor(private userService: UserService){}

    logout(){
        this.userService.logout()
    }

}
