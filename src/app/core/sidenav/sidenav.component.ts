import { Component,Input,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserGet } from 'src/app/models/user';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppRouting } from 'src/app/enums/AppRouting.enum';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers:[AuthenticationService]
})

export class SidenavComponent implements OnInit {
  screens: any
  isLogged$: Observable<boolean>;
  submitted = false;
  returnUrl: string;
  cameraImage: SafeResourceUrl;
  image: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => 
        result.matches
        ),
      shareReplay()
    ); 



  constructor(private breakpointObserver: BreakpointObserver,
              public authenticationService: AuthenticationService,
              private userService: UserService,
              private sanitizer: DomSanitizer,
               private router: Router) {
  }

  ngOnInit(){
    // TODO PROBA    
   this.image = 'assets/userEmpty.jpg';
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
   // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.isLogged$ = this.authenticationService.isLoggedIn;
    this.userService.getScreens().subscribe(data => {this.screens = data})

    this.isLogged$.subscribe(res => 
      {
      if(res) {
        if (this.authenticationService.getCurrentImage() != 'undefined')
         this.cameraImage = this.authenticationService.getCurrentImage()
      } else {
        //Comentar para dev
       // this.router.navigate([AppRouting.Login])
      }
     
      
    })
  }
 
  logout() {
  this.authenticationService.logout();
  }
  public getScrrens(){
  //  this.user.getScreensByRule().subscribe(data => {this.screens = data})
  }
  onSubmit() {
    this.submitted = true;
  }
}
