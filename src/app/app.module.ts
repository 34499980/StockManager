import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';





import { ArquitecturaModule } from './arquitectura/arquitectura.module';
import { SucursalesModule } from './sucursales/sucursales.module';




@NgModule({
  declarations: [
    AppComponent,    
    
    
  ],
  imports: [
    ArquitecturaModule,
    SucursalesModule
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
