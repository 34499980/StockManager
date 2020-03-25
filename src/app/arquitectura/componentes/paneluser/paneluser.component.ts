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
    let i = 0
    while(i < this._param.length){
      if(this._param[i].param != "Password")
      {
        i++
      }else{
        break;
      }
      
    }
    this._param.splice(i,1)    
    
  }
  VerPerfil(user: any): void{
    this._router.navigate(["Perfil",user.Datos[0].userName])
  }


}
