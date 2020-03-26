import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ArquitecturaModule } from '../arquitectura/arquitectura.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { AppRoutingModule } from '../app-routing.module';
import {MatButtonModule} from '@angular/material/button';
import { VentasComponent } from './ventas/ventas.component'
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';





@NgModule({
  declarations: [UsuariosComponent, PerfilComponent, VentasComponent],
  imports: [
    CommonModule,
    ArquitecturaModule,
    FormsModule,
    AppRoutingModule ,   
    ReactiveFormsModule,
    MatButtonModule,    
    MatInputModule,
    MatRippleModule
    
  ]
})
export class SucursalesModule { }
