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
import {MatRadioModule} from '@angular/material/radio';
import { PagoComponent } from './pago/pago.component';
import { MatListModule } from '@angular/material/list';
import { TruncatePipe } from './pipes/truncate.pipe';




@NgModule({
  declarations: [VentasComponent, AnularComponent, PagoComponent,TruncatePipe],
  imports: [
    CommonModule,
    ArquitecturaModule,
    FormsModule,
    AppRoutingModule ,   
    ReactiveFormsModule,
    MatButtonModule,    
    MatInputModule,
    MatRippleModule, 
    MatRadioModule,
    MatListModule,    
    AgGridModule.withComponents([])  
  ]
})
export class FacturacionModule { }
