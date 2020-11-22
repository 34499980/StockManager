import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginModule } from './pages/login/login.module';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    LoginModule
  ],
  exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
