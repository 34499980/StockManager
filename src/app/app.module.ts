import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ArquitecturaModule } from './arquitectura/arquitectura.module';
import { SucursalesModule } from './sucursales/sucursales.module';
import { FacturacionModule } from './facturacion/facturacion.module';
import { StockModule } from './stock/stock.module';
import { ServicesModule } from './services/services.module';
import { RulesModule } from './rules/rules.module';
import { UsersModule } from './users/users.module';
import { HomeComponent } from './sucursales/usuarios/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    ArquitecturaModule,
    FacturacionModule,
    RulesModule,
    SucursalesModule,
    FacturacionModule,
    StockModule,
    ServicesModule,
    UsersModule,
    FlexLayoutModule
  ],
  exports:[FlexLayoutModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
