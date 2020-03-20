import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './sucursales/usuarios/usuarios.component';
import { MercaderiaComponent } from './stock/mercaderia/mercaderia.component';
import { PerfilComponent } from './sucursales/perfil/perfil.component';


const routes: Routes = [ 
  {
    path: 'Usuarios',
    component: UsuariosComponent   
  },
  {
    path: 'Stock',
    component: MercaderiaComponent   
  }
  ,
  {
    path: 'Perfil/:userName',
    component: PerfilComponent   
  }
  ,
  {
    path: 'Perfil',
    component: PerfilComponent   
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
