import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stockmanager';
  public loginVisible: boolean
  _autentication : AuthenticationService
  constructor(private autentication: AuthenticationService){
 this._autentication = autentication
  }
  public setVisible(){
    this.loginVisible = false
  }
  ngOnInit(){
    this.loginVisible = true
    console.log(this.loginVisible)
  }
 
}
