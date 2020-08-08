import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MercaderiaComponent } from './mercaderia/mercaderia.component';
import { ArquitecturaModule } from '../arquitectura/arquitectura.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { CambioDevolucionComponent } from './cambio-devolucion/cambio-devolucion.component';
import { DespachosComponent } from './despachos/despachos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';




@NgModule({
  declarations: [MercaderiaComponent,CambioDevolucionComponent, DespachosComponent],
  imports: [
    CommonModule,
    ArquitecturaModule,
    FormsModule,
    AppRoutingModule ,   
    ReactiveFormsModule,
    MatButtonModule,    
    MatInputModule,
    MatRippleModule, 
    MatFormFieldModule,
    FormsModule,
    MatSelectModule
    
    
  ]
})
export class StockModule { }
