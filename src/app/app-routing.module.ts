import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesResolver } from './resolvers/Roles.resolver';
import { SucursalResolver } from './resolvers/sucursal.resolver';

const appRoutes: Routes = [
  {
    path: 'PageLogin',
    loadChildren: () => import('../app/pages/login/login.module'). then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, {
    scrollPositionRestoration: 'enabled',
    enableTracing: false,
    onSameUrlNavigation: 'reload'
  }),
],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
