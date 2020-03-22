import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ArquitecturaModule } from '../arquitectura/arquitectura.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { AppRoutingModule } from '../app-routing.module';





@NgModule({
  declarations: [UsuariosComponent, PerfilComponent],
  imports: [
    CommonModule,
    ArquitecturaModule,
    FormsModule,
    AppRoutingModule ,   
    ReactiveFormsModule,
  ]
})
export class SucursalesModule { }
