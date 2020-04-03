import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';





import { ArquitecturaModule } from './arquitectura/arquitectura.module';
import { SucursalesModule } from './sucursales/sucursales.module';
import { FacturacionModule } from './facturacion/facturacion.module';




@NgModule({
  declarations: [
    AppComponent,    
    
    
  ],
  imports: [
    ArquitecturaModule,
    SucursalesModule,
    FacturacionModule
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
