import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { AppComponent } from 'src/app/app.component';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  _usuario: any
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isLoggedIn$: Observable<boolean>;
  image: any;


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
      private arquitecturaService: ArquitecturaService,
      private breakpointObserver: BreakpointObserver,
      private userService: UserService
  ) {
  }

  ngOnInit() {
    this.image = 'assets/userEmpty.jpg'
    this.isLoggedIn$ = this.authenticationService.isLogged;
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      // tslint:disable-next-line: no-string-literal
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login(){
    this.loading = false
    this.router.navigate(['Home'])
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  getUsers(){
    this.userService.getUsuarios().subscribe(res => {console.log(res)})
  }
  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this.authenticationService.login(this.f.username.value, this.f.password.value).
      subscribe(res =>
              {
                if(res){
                  this.login()
                }else{
                  this.loading = false;
                  this.arquitecturaService.openDialog('Error','Error en el usuario o contraseña!')
                }
              }
              )
      this.loading = true;

}
}
