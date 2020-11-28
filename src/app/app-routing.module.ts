import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RolesResolver } from './resolvers/Roles.resolver';
import { SucursalResolver } from './resolvers/sucursal.resolver';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'Login',
    pathMatch : 'full'
  },
  {
    path: 'Login',
    loadChildren: () => import('../app/pages/login/login.module'). then(m => m.LoginModule)
  },
  {
    path: 'Home',
    loadChildren: () => import('../app/pages/home/home.module'). then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
    scrollPositionRestoration: 'enabled',
    enableTracing: false,
    onSameUrlNavigation: 'reload'
  }),
],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
