import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from 'src/app/arquitectura/componentes/sidenav/sidenav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  _sidenav: SidenavComponent
  constructor(private sidenav: SidenavComponent) { 
    this._sidenav = sidenav
  }

  ngOnInit(): void {
    this._sidenav.getScrrens() 
  }

}
