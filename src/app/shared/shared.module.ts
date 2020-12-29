import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { DialogMessageComponent } from './dialogs/dialogMessage/dialogMessage.component';
import { InputrequiredComponent } from './components/inputrequired/inputrequired.component';
import { AvatarModule } from 'ngx-avatar';
import { PaneluserComponent } from './components/paneluser/paneluser.component';
import { DialogconfirmComponent } from './dialogs/dialogconfirm/dialogconfirm.component';
import { ToastrModule } from 'ngx-toastr';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationModule } from '../translation/translation.module';

const COMPONENTS = [
    InputrequiredComponent,
    DialogMessageComponent,
    DialogconfirmComponent,
    PaneluserComponent
];
const MODULES = [
  AvatarModule,  
  TranslateModule
]
@NgModule({
    imports: [
    CommonModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCheckboxModule, 
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    ...MODULES

  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTreeModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatRadioModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatMenuModule,
    ToastrModule,
    ...COMPONENTS,
    ...MODULES
  ],
   declarations: [
    ...COMPONENTS,
    DialogconfirmComponent
  ]
})
export class SharedModule { }
