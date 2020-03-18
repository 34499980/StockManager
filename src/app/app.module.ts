import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [
    AppComponent,    
    SidenavComponent,
    
  ],
  imports: [
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
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
