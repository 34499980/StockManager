import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

export interface DialogData {
  title: string;
  
}
@Component({
  selector: 'app-dialogconfirm',
  templateUrl: './dialogconfirm.component.html',
  styleUrls: ['./dialogconfirm.component.css']
})
export class DialogconfirmComponent implements OnInit {
  _usuario: string
  _password: string
  _response: any = false
  _data : any
  _userService: UserService
  _dialogRef: MatDialogRef<DialogconfirmComponent>
  constructor(dialogRef: MatDialogRef<DialogconfirmComponent>,@Inject(MAT_DIALOG_DATA) data: DialogData,userService: UserService) {
    this._dialogRef = dialogRef
    this._userService = userService
    this._data = data
   }

  ngOnInit(): void {
  }
 validateAdminUser(){ 
  if(this._usuario != "" && this._usuario != undefined && this._password != "" && this._password != undefined)
  {
    if(this._userService.validateAdminUser(this._usuario,this._password))
    {
      this._response = true
      this._dialogRef.close(this._response)   
    }
    this._response = false
  }
 
 }

}
