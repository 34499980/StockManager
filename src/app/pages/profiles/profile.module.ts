import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './userlist/userlist.component';
import { UserListResolver } from 'src/app/resolvers/userlist.resolver';
import { ProfileComponent } from './profil/profile.component';
import { SucursalResolver } from 'src/app/resolvers/sucursal.resolver';
import { RolesResolver } from 'src/app/resolvers/roles.resolver';
import { UserResolver } from './profil/profile.resolver';
const routes: Routes = [
  {
    path: 'all',
    component: UserListComponent,
    resolve:{
      userlist: UserListResolver,
      sucursal: SucursalResolver,
      roles: RolesResolver,
    }
  },
  {
    path: ':id',
    component: ProfileComponent,
    resolve:{
      sucursal: SucursalResolver,
      roles: RolesResolver,
      profile: UserResolver
    }
  },
  {
    path: '',
    component: ProfileComponent,
    resolve:{
      sucursal: SucursalResolver,
      roles: RolesResolver
    }
  }
]


@NgModule({
  declarations: [UserListComponent, ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [UserListResolver, SucursalResolver, RolesResolver, UserResolver]

})
export class ProfileModule { }
