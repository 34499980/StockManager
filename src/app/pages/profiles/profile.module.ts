import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './userlist/userlist.component';
import { UserListResolver } from 'src/app/resolvers/userlist.resolver';
const routes: Routes = [
  {
    path: 'all',
    component: UserListComponent,
    resolve:{
      userlist: UserListResolver
    }
  }
]


@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [UserListResolver],
  exports:[UserListComponent]
})
export class ProfileModule { }
