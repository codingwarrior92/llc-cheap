import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedUsersComponent } from './authorized-users.component';



@NgModule({
  declarations: [
    AuthorizedUsersComponent
  ],
  exports: [
    AuthorizedUsersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthorizedUsersModule { }
