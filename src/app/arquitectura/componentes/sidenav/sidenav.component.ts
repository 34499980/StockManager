import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserLogin } from 'src/app/users/UserLogin';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../class/usuario';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { ToastService } from 'src/app/services/toast.service';


 


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers:[UserLogin,ToastService]
}) 

export class SidenavComponent { 
  screens: any
  isLoggedIn$: Observable<boolean>;
  isLogged$: Observable<boolean>;

  _usuario: any
  static user: Usuario = new Usuario
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  _arquitecturaService: ArquitecturaService
 

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );



  constructor(private breakpointObserver: BreakpointObserver,private user: UserLogin,private authenticationService: AuthenticationService,private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder,  private userLogin: UserLogin, private toastService : ToastService  ) {
   

    
   
  }

  ngOnInit(){
   
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.isLoggedIn$ = this.authenticationService.isLogged;
    this.isLogged$ = this.authenticationService.isLoggedIn;
    
    this.user.getScreensByRule().subscribe(data => {this.screens = data})
    
  }
  public getScrrens(){
  //  this.user.getScreensByRule().subscribe(data => {this.screens = data})
  }
  logout(){
    this.authenticationService.logout()
    this.router.navigate(['/PageLogin'], {relativeTo: this.route});
  }
  login(){     

    this.userLogin._userName = this.f.username.value
    this.userLogin._password = this.f.password.value
    this.loading = false
    this.router.navigate(['/'])
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
     
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    
    this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(res => 
                                                                                                {
                                                                                                  if(Boolean(Number(res))){
                                                                                                    this.login()
                                                                                                  }else{
                                                                                                    this.loading = false;
                                                                                                    this.toastService.error(this.authenticationService.ErrorMessage)
                                                                                                    //this._arquitecturaService.openDialog("Error","Error en el usuario o contraseña!")
                                                                                                  }
                                                                                                }
                                                                                                )
                                                                                      
       
    this.loading = true;
   
 
}



}
