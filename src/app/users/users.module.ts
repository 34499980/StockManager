import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from '../services/services.module';
import { PageLoginComponent } from './pagelogin/pagelogin.component';
import { ArquitecturaModule } from '../arquitectura/arquitectura.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [PageLoginComponent],
  imports: [
    CommonModule,
    ServicesModule,
    ArquitecturaModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    
  ],
  exports:[PageLoginComponent]
})
export class UsersModule { }
