import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginModule } from './pages/login/login.module';
import { SharedModule } from './shared/shared.module';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './interceptors/error/errorInterceptor';
import { CoreModule } from './core/core.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
   // LoginModule,
  ],
  exports:[],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
