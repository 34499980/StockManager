import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/arquitectura/class/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { AppComponent } from 'src/app/app.component';
import { UserLogin } from '../UserLogin';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-pagelogin',
  templateUrl: './pagelogin.component.html',
  styleUrls: ['./pagelogin.component.css']
})
export class PageLoginComponent implements OnInit {
  _usuario: any
  static user: Usuario = new Usuario
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  _arquitecturaService: ArquitecturaService
  isLoggedIn$: Observable<boolean>;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      arquitecturaService: ArquitecturaService,
      private userLogin: UserLogin,     
      private breakpointObserver: BreakpointObserver,
     
  ) {
      this._arquitecturaService = arquitecturaService
      // redirect to home if already logged in
     
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authenticationService.isLogged;
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login(){     

    this.userLogin._userName = this.f.username.value
    this.userLogin._password = this.f.password.value
    this.router.navigate(['Home'])
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
     
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      
      this.authenticationService.login(this.f.username.value, this.f.password.value)
                                                                                        .subscribe(
                                                                                            res => 
                                                                                            {this.login()},
                                                                                            error => {
                                                                                                this._arquitecturaService.openDialog('error',error.message)
                                                                                               ,  this.loading = false
                                                                                                
                                                                                                /*let message
                                                                                                switch(error.status){
                                                                                                    case 0:
                                                                                                        message = 'Error de conexion al servicio.'
                                                                                                    break;
                                                                                                    case 500:
                                                                                                        message = error.error.ExceptionMessage
                                                                                                     break;*/

                                                                                                }
                                                                                                 //desa
                                                                                                // this.router.navigate(['Home']),
                                                                                                 //prod
                                                                                               
                                                                                              
                                                                                            
        )       
         
      this.loading = true;
     
   
}
}
