import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';

@Component({
  selector: 'app-paneluser',
  templateUrl: './paneluser.component.html',
  styleUrls: ['./paneluser.component.css']
})
export class PaneluserComponent implements OnInit {
 @Input() user: Usuario
  _image: string
  _param: any
  @ViewChild('file') file :ElementRef
  _fileSelected: File = null
 _router: Router
  constructor(router: Router,private arquitecturaService: ArquitecturaService) {
    this._router = router
   }

  ngOnInit(): void {
    this._image = '../../../../assets/userEmpty.jpg';
    this.arquitecturaService.getCamposPerfil().subscribe(res => {this._param = res})

  }
  VerPerfil(user: any): void{
    this._router.navigate(['Perfil',user.userName])
  }
  OnFileSelected(event){
    this.file.nativeElement.click()
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    this._fileSelected = <File>event.target.files === undefined ? undefined : <File>event.target.files[0]
    if(this._fileSelected !== undefined) {

    }

  }


}
