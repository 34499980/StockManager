import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MercaderiaComponent } from './mercaderia/mercaderia.component';
import { ArquitecturaModule } from '../arquitectura/arquitectura.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';




@NgModule({
  declarations: [MercaderiaComponent],
  imports: [
    CommonModule,
    ArquitecturaModule,
    FormsModule,
    AppRoutingModule ,   
    ReactiveFormsModule,
    MatButtonModule,    
    MatInputModule,
    MatRippleModule, 
    
  ]
})
export class StockModule { }
