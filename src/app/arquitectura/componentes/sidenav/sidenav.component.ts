import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserLogin } from 'src/app/users/UserLogin';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';


 


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers:[UserLogin]
})

export class SidenavComponent { 
  screens: any
  isLoggedIn$: Observable<boolean>;
  isLogged$: Observable<boolean>;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );



  constructor(private breakpointObserver: BreakpointObserver,private user: UserLogin,private authenticationService: AuthenticationService, private router:Router) {
   

    
   
  }

  ngOnInit(){
    this.isLoggedIn$ = this.authenticationService.isLoggedIn;
    this.isLogged$ = this.authenticationService.isLogged;
    
    this.user.getScreensByRule().subscribe(data => {this.screens = data})
    
  }
  public getScrrens(){
  //  this.user.getScreensByRule().subscribe(data => {this.screens = data})
  }
  logout(){
    this.authenticationService.logout()
    this.router.navigate(['/']);
  }



}
