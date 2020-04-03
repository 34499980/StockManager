import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './sucursales/usuarios/usuarios.component';
import { MercaderiaComponent } from './stock/mercaderia/mercaderia.component';
import { PerfilComponent } from './sucursales/perfil/perfil.component';
import { MovimientosComponent } from './sucursales/movimientos/movimientos.component';
import { VentasComponent } from './facturacion/ventas/ventas.component';
import { AnularComponent } from './facturacion/anular/anular.component';
import { AnularcionesComponent } from './sucursales/anularciones/anularciones.component';


const routes: Routes = [ 
  {
    path: 'Usuarios',
    component: UsuariosComponent   
  },
  {
    path: 'Stock',
    component: MercaderiaComponent   
  },  
  {
    path: 'Movimientos',
    component: MovimientosComponent   
  },  
  {
    path: 'Perfil',
    component: PerfilComponent   
  },
  {
    path: 'Perfil/:userName',
    component: PerfilComponent   
  }
  ,
  {
    path: 'Ventas',
    component: VentasComponent   
  }
  ,
  {
    path: 'Anular',
    component: AnularComponent   
  },
  {
    path: 'Anulaciones',
    component: AnularcionesComponent   
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
