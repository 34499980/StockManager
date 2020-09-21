import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ArquitecturaModule } from '../arquitectura/arquitectura.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { AppRoutingModule } from '../app-routing.module';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MovimientosComponent } from './movimientos/movimientos.component';
import {AgGridModule } from 'ag-grid-angular';
import { AnularcionesComponent } from './anularciones/anularciones.component'
import { MatCardModule } from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';





@NgModule({
  declarations: [UsuariosComponent, PerfilComponent, MovimientosComponent, AnularcionesComponent],
  imports: [
    CommonModule,
    ArquitecturaModule,
    FormsModule,
    AppRoutingModule ,   
    ReactiveFormsModule,
    MatButtonModule,    
    MatInputModule,
    MatRippleModule, 
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatRippleModule, 
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    AgGridModule.withComponents([])  
    
    
  ]
})
export class SucursalesModule { }
