import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserLogin } from '../users/UserLogin';

 


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers:[UserLogin]
})

export class SidenavComponent {
 user: UserLogin
 screens: any
 

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );



  constructor(private breakpointObserver: BreakpointObserver, user: UserLogin) {
    this.user = user;

    
   
  }

  ngOnInit(){
    
    this.user.getScreensByRule().subscribe(data => {this.screens = data})
  }


}
