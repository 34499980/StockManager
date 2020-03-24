import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../class/usuario';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';

@Component({
  selector: 'app-paneluser',
  templateUrl: './paneluser.component.html',
  styleUrls: ['./paneluser.component.css']
})
export class PaneluserComponent implements OnInit {
 @Input() Usuario: any
  user: any
  _param: any
  _arquitecturaService: ArquitecturaService
 _router: Router
  constructor(router: Router, arquitecturaService: ArquitecturaService) {
    this._router = router
    this._arquitecturaService = arquitecturaService
   }

  ngOnInit(): void {
    this._arquitecturaService.getCampos().subscribe(res => {this._param = res})
  }
  VerPerfil(user: any): void{
    this._router.navigate(["Perfil",user.Datos[0].userName])
  }


}
