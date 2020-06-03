import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './sucursales/usuarios/usuarios.component';
import { MercaderiaComponent } from './stock/mercaderia/mercaderia.component';
import { PerfilComponent } from './sucursales/perfil/perfil.component';
import { MovimientosComponent } from './sucursales/movimientos/movimientos.component';
import { VentasComponent } from './facturacion/ventas/ventas.component';
import { AnularComponent } from './facturacion/anular/anular.component';
import { AnularcionesComponent } from './sucursales/anularciones/anularciones.component';
import { CambioDevolucionComponent } from './stock/cambio-devolucion/cambio-devolucion.component';
import { PagoComponent } from './facturacion/pago/pago.component';
import { DespachosComponent } from './stock/despachos/despachos.component';
import { HomeComponent } from './sucursales/usuarios/home/home.component';



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
  },
  {
    path: 'Cambios/Devolución',
    component: CambioDevolucionComponent   
  },
  {
    path: 'Pago',
    component: PagoComponent  
  },
  {
    path: 'Despachos',
    component: DespachosComponent  
  },{
    path: 'Home',
    component: HomeComponent  
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
