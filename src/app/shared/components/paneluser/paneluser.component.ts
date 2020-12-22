import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { User, UserGet } from 'src/app/models/user';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { DialogconfirmComponent } from '../../dialogs/dialogconfirm/dialogconfirm.component';

@Component({
  selector: 'app-paneluser',
  templateUrl: './paneluser.component.html',
  styleUrls: ['./paneluser.component.css']
})
export class PaneluserComponent implements OnInit {
 @Input() user: UserGet;
  _image: string
  _param: any
  @ViewChild('file') file :ElementRef
  _fileSelected: File = null
 _router: Router
  constructor(private router: Router,
              private arquitecturaService: ArquitecturaService,
              private dialog: MatDialog,
              private userService: UserService,
              private toastService: ToastService) {
    this._router = router
   }

  ngOnInit(): void {
    this._image = '../../../../assets/userEmpty.jpg';
    this.arquitecturaService.getCamposPerfil().subscribe(res => {this._param = res})

  }
  VerPerfil(user: any): void{
    this._router.navigate([AppRouting.Profile, user.userName])
  }
  OnFileSelected(event){
    this.file.nativeElement.click()
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    this._fileSelected = <File>event.target.files === undefined ? undefined : <File>event.target.files[0]
    if(this._fileSelected !== undefined) {

    }

  }
  delete(user: any) {
    const dialogRef = this.dialog.open(DialogconfirmComponent, {
      disableClose: true,
      data:{title:"Eliminar usuario", message:"El usuario no podra realizar ningun tipo de operación"}
        });
      
       dialogRef.afterClosed().subscribe(result => {
         if(result === true){
          this.userService.remove(this.user.id).subscribe(() => 
          {this.toastService.success("El usuario ha sido eliminado!"),
          this.router.navigate([AppRouting.UserList])
        });
      }
   });
  }


}
