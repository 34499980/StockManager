import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from '../services/services.module';
import { PageLoginComponent } from './pagelogin/pagelogin.component';
import { ArquitecturaModule } from '../arquitectura/arquitectura.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar';



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
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule
    
  ],
  exports:[PageLoginComponent]
})
export class UsersModule { }
