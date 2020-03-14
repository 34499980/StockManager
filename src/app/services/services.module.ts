import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';



@NgModule({
  declarations: [UserService],
  imports: [
    CommonModule
  ],
  exports:[UserService]
})
export class ServicesModule { }
