import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/arquitectura/class/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';

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
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      arquitecturaService: ArquitecturaService
  ) {
      this._arquitecturaService = arquitecturaService
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
     
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      
      this.authenticationService.login(this.f.username.value, this.f.password.value).pipe(
                                                                                        first()
                                                                                        ).subscribe(
                                                                                            res => {res},
                                                                                            error => {
                                                                                                let message
                                                                                                switch(error.status){
                                                                                                    case 0:
                                                                                                        message = 'Error de conexion al servicio.'
                                                                                                    break;

                                                                                                }
                                                                                                this._arquitecturaService.openDialog('error',message),
                                                                                                this.loading = false
                                                                                            }
        )       
         
      this.loading = true;
     
   
}
}
