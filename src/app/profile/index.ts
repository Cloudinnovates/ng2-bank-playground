import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth';
import {ProfileComponent} from "./components/profile";




const routes: Routes = [
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];


@NgModule({
  declarations: [
      ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ]
})

export class ProfileModule {}

