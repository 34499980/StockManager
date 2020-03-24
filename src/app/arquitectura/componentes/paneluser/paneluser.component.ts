import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../class/usuario';

@Component({
  selector: 'app-paneluser',
  templateUrl: './paneluser.component.html',
  styleUrls: ['./paneluser.component.css']
})
export class PaneluserComponent implements OnInit {
 @Input() Usuario: any
  user: any
 _router: Router
  constructor(router: Router) {
    this._router = router
   }

  ngOnInit(): void {
    
  }
  VerPerfil(user: any): void{
    this._router.navigate(["Perfil",user.Datos[0].userName])
  }


}
