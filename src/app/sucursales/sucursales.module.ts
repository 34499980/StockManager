import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ArquitecturaModule } from '../arquitectura/arquitectura.module';



@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    ArquitecturaModule
    
    
  ]
})
export class SucursalesModule { }
