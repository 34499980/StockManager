import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { Usuario } from 'src/app/arquitectura/class/usuario';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  _userService: UserService
 
  Usuarios: any
  _searchUser: any;
  _usuariosSearch :any
  _param: any
  constructor(userService: UserService) {
    this._userService = userService
    
   }

  ngOnInit(): void {
   this._userService.getUsuarios().subscribe(res => {this.Usuarios = res,
                                                      this._usuariosSearch = this.Usuarios as Usuario;
                                                   })

   
  }
  FiltrarUsuario(): void{
    if(this._searchUser==" " || this._searchUser==undefined || this._searchUser.length == 0){
      this._usuariosSearch = this.Usuarios
    }else{
      this._usuariosSearch = [] 
      for(let index in this.Usuarios){
        let user = this.Usuarios[index] 
        if(user.Titulo.toLowerCase().indexOf(this._searchUser.toLowerCase()) != -1){
          this._usuariosSearch.push(user)
        }

      }    
  
    }
  }

}
