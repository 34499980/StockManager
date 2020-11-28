import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { ToastService } from 'src/app/services/toast.service';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers:[AuthenticationService]
})

export class SidenavComponent implements OnInit {
  screens: any
  isLoggedIn$: Observable<boolean>;
  isLogged$: Observable<boolean>;
  submitted = false;
  returnUrl: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );



  constructor(private breakpointObserver: BreakpointObserver,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private userService: UserService ) {
  }

  ngOnInit(){
      // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
   // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.isLoggedIn$ = this.authenticationService.isLogged;
    this.isLogged$ = this.authenticationService.isLoggedIn;
    this.userService.getScreens().subscribe(data => {this.screens = data})
  }
  logout() {

  }
  public getScrrens(){
  //  this.user.getScreensByRule().subscribe(data => {this.screens = data})
  }
  onSubmit() {
    this.submitted = true;
  }
}
