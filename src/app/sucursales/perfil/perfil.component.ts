import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';


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
  
}

