import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './componentes/sidenav/sidenav.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from '../app-routing.module';
import { PaneluserComponent } from './componentes/paneluser/paneluser.component';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InputrequiredComponent } from './componentes/inputrequired/inputrequired.component';
import { DialogconfirmComponent } from './componentes/dialogconfirm/dialogconfirm.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ModaldetailsComponent } from './componentes/modaldetails/modaldetails.component';
import { NgFallimgModule } from 'ng-fallimg';
import { DialogMessageComponent } from './componentes/dialogMessage/dialogMessage.component';
import { RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';








@NgModule({
  declarations: [SidenavComponent,PaneluserComponent, InputrequiredComponent, DialogconfirmComponent, ModaldetailsComponent,DialogMessageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTreeModule,
    MatIconModule,     
    NgbModule,
    MatExpansionModule,    
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    
    RouterModule.forRoot([])
    
    
  ],
  exports:[SidenavComponent,PaneluserComponent,InputrequiredComponent,DialogconfirmComponent,MatDialogModule,DialogMessageComponent]
})
export class ArquitecturaModule { }
