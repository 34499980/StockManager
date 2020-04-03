import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquitecturaModule } from '../arquitectura/arquitectura.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { AgGridModule } from 'ag-grid-angular';
import { VentasComponent } from './ventas/ventas.component';
import { AnularComponent } from './anular/anular.component';



@NgModule({
  declarations: [VentasComponent, AnularComponent],
  imports: [
    CommonModule,
    ArquitecturaModule,
    FormsModule,
    AppRoutingModule ,   
    ReactiveFormsModule,
    MatButtonModule,    
    MatInputModule,
    MatRippleModule, 
    AgGridModule.withComponents([])  
  ]
})
export class FacturacionModule { }
