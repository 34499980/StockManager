import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { Usuario } from 'src/app/arquitectura/class/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';


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
_rules: any
_sucursal: any
formControl = new FormGroup({
  Categoria : new FormControl('', Validators.required),
  Sucursal : new FormControl('', Validators.required)
})

_selectedCategoria: any
_selectedSucursal: any
//static user: Usuario = new Usuario


  constructor(private alertService: AlertService,actiavateRoute: ActivatedRoute,userService: UserService,arquitecturaService: ArquitecturaService) {
    this._actiavateRoute = actiavateRoute
    this._userService = userService
    this._arquitecturaService = arquitecturaService
   }

  ngOnInit(): void {
    this._rules = undefined
    this._selectedSucursal = {name: 'loading...'}
    this._userService.getAllSucursal().subscribe(res => {this._sucursal = res})
    this._userService.getAllRules().subscribe(res=>{this._rules = res,
                                                  this._selectedCategoria = Object.assign({}, this._rules.find(x => x.description == "Vendedor"))
                                                })
   let userIndex = this._actiavateRoute.snapshot.paramMap.get('userName')
   if(userIndex != null){
    this._userService.getUsuariosByUserName(userIndex).subscribe(res => {this.user = res as Usuario,
                                                                        this.user.Rule = Object.assign({}, this._rules.find(x => x.id == this.user.idRule).description),
                                                                        this.fillSelect()
                                                                      })
  }else{
    this.user = new Usuario
    this._image = "../../../../assets/userEmpty.jpg"
  
  }

   this._arquitecturaService.getCamposPerfil().subscribe(res => {this._columns = res})
  }
  fillSelect(){
    this._selectedCategoria = Object.assign({},this._rules.find(x => x.id == this.user.idRule))
    this._selectedSucursal= Object.assign({},this._sucursal.find(x => x.id == this.user.idSucursal))
  }
  changeCategoria(rule){
    this._selectedCategoria = Object.assign({}, this._rules.find( x => x.description == rule))
    
  }
  changeSucursal(rule){
    this._selectedSucursal = Object.assign({}, this._sucursal.find( x => x.name == name))
    
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
                                                                  this.alertService.success("Usuario guardado!")
                                                                }else{
                                                                  this.alertService.success("Error al guardar usuario!")
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

