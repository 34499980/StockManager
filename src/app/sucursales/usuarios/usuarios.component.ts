import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
 // _userService: UserService
  Usuarios: any
  constructor(/*userService: UserService*/) {
   // this._userService = userService
   }

  ngOnInit(): void {
  // this._userService.getUsuarios().subscribe(res => {this.Usuarios = res})
  }

}
