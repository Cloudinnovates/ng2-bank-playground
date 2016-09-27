import {Component} from '@angular/core';
import {AuthService} from "../../auth/services/auth-service";

@Component({
    selector: "app-header",
    template: `
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
            <a class="navbar-brand" href="#"><i class="fa fa-money" aria-hidden="true"></i> Bank</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li><a [routerLink]="['/accounts']" >My Account</a></li>
                <li><a [routerLink]="['/profile']" >My Profile</a></li>
            </ul>
            
            <ul class="nav navbar-nav navbar-right">
                <li><a>{{ authService.name }}</a></li>
                <li><a href="#" (click)="logout()">Logout</a></li>
            </ul>
        </div><!-- /.navbar-collapse -->
        
    </div><!-- /.container-fluid -->
</nav>
`
})
export class AppHeaderComponent {

    constructor(private authService: AuthService) {
    }

    logout() {
        this.authService.logout()
    }

}
