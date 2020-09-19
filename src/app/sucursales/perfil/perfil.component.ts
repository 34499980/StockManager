import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
  _image: string
  @ViewChild('file') file :ElementRef
  _fileSelected: File = null
  user: Usuario = undefined
_actiavateRoute: ActivatedRoute
_userService: UserService
_arquitecturaService: ArquitecturaService
_columns: any
static user: Usuario = new Usuario


  constructor(actiavateRoute: ActivatedRoute,userService: UserService,arquitecturaService: ArquitecturaService) {
    this._actiavateRoute = actiavateRoute
    this._userService = userService
    this._arquitecturaService = arquitecturaService
   }

  ngOnInit(): void {
   let userIndex = this._actiavateRoute.snapshot.paramMap.get('userName')
   if(userIndex != null){
    this._userService.getUsuariosByUserName(userIndex).subscribe(res => {this.user = res as Usuario})
  }else{
    this.user = new Usuario
    this._image = "../../../../assets/userEmpty.jpg"
  
  }

   this._arquitecturaService.getCamposPerfil().subscribe(res => {this._columns = res})
  }
  updateUsuario(value: any){
    let val = value.pop() 
    let param = value.pop() 
    if(this.user != undefined){
       this.user[param] = val
    }else{
      PerfilComponent.user[param] = val
    }
  }
  saveUsuario(){
    if(this.user== undefined)
    this.user =  PerfilComponent.user
    this._userService.saveUsuario(this.user);
  }
  OnFileSelected(event){   
    this.file.nativeElement.click()
    this._fileSelected = <File>event.target.files == undefined ? undefined : <File>event.target.files[0]
    if(this._fileSelected != undefined){
  
    }
   

  }
  
}

