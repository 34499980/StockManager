import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { Usuario } from 'src/app/arquitectura/class/usuario';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
 _usuario: any
_actiavateRoute: ActivatedRoute
_userService: UserService
_arquitecturaService: ArquitecturaService
_param: any
static user: Usuario = new Usuario


  constructor(actiavateRoute: ActivatedRoute,userService: UserService,arquitecturaService: ArquitecturaService) {
    this._actiavateRoute = actiavateRoute
    this._userService = userService
    this._arquitecturaService = arquitecturaService
   }

  ngOnInit(): void {
   let userIndex = this._actiavateRoute.snapshot.paramMap.get('userName')
   this._userService.getUsuariosById(userIndex).subscribe(res => {this._usuario = res})
   this._arquitecturaService.getCampos().subscribe(res => {this._param = res})
  }
  updateUsuario(value: any){
    let val = value.pop() 
    let param = value.pop() 
    if(this._usuario != undefined){
       this._usuario[0]["Datos"][0][param] = val
    }else{
      PerfilComponent.user[param] = val
    }
  }
  saveUsuario(){
    if(this._usuario== undefined)
    this._usuario =  PerfilComponent.user
    this._userService.saveUsuario(this._usuario);
  }
  
}

