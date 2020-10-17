import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { Usuario } from 'src/app/arquitectura/class/usuario';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


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
_columns: any
_roles: any
_sucursal: any
formControl: FormGroup

//static user: Usuario = new Usuario


  constructor(private _authenticacionService: AuthenticationService,
              private _alertService: AlertService,
              private _actiavateRoute: ActivatedRoute,
              private _userService: UserService,
              private _arquitecturaService: ArquitecturaService) {
  
   }

  ngOnInit(): void {
    this.formControl = new FormBuilder().group({
      role : new FormControl('', Validators.required),
      sucursal : new FormControl('', Validators.required)
    })
    this._roles = this._actiavateRoute.snapshot.data.roles as any;
    this._sucursal = this._actiavateRoute.snapshot.data.sucursal as any;  
    this.formControl.controls['role'].setValue(Object.assign({}, this._roles.find(x => x.description == "Vendedor")))
   
    this._arquitecturaService.getCamposPerfil().subscribe(res => {this._columns = res})   
   
   let userIndex = this._actiavateRoute.snapshot.paramMap.get('userName')
   if(userIndex != null){
    this._userService.getUsuariosByUserName(userIndex).subscribe(res => {this.user = res as Usuario,
                                                                        this.user.Rule = Object.assign({}, this._roles.find(x => x.id == this.user.idRule).description),
                                                                        this.fillSelect()
                                                                      })
  }else{
    this.user = new Usuario
    this._image = "../../../../assets/userEmpty.jpg"
    let userAux = this._authenticacionService.getSession();
    this._userService.getUsuariosByUserName(userAux).subscribe(res => {
      this.formControl.controls['sucursal'].setValue(this._sucursal.find(x => x.id == res.idSucursal))
    })
  }

  
  }
  fillSelect(){
    this.formControl.controls['role'].setValue(this._roles.find(x => x.id == this.user.idRule))
    this.formControl.controls['sucursal'].setValue(this._sucursal.find(x => x.id == this.user.idSucursal))
  } 
 validateSpinner(){
  return this.user
 }
  updateUsuario(value: any){
    if(value.isTrusted == undefined){
      let val = value.pop() 
      let param = value.pop() 
      if(this.user != undefined){
        this.user[param] = val
      }else{
        this.user[param] = val
      }
   }
  }
  saveUsuario(){
    
    this._userService.saveUsuario(this.user).subscribe(res => {
                                                                if(res == true){
                                                                  this._alertService.success("Usuario guardado!")
                                                                }else{
                                                                  this._alertService.success("Error al guardar usuario!")
                                                                }
    });
  }
  OnFileSelected(event){   
    this.file.nativeElement.click()
    this._fileSelected = <File>event.target.files == undefined ? undefined : <File>event.target.files[0]
    if(this._fileSelected != undefined){
  
    }
   

  }
  
}

