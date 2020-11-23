import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginModule } from './pages/login/login.module';
import { SharedModule } from './shared/shared.module';
import {HttpClientModule } from '@angular/common/http'



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    LoginModule,
    HttpClientModule
  ],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
