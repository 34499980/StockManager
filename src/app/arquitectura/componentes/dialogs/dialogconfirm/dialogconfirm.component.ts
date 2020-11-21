import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

export interface DialogData {
  title: string;
  text: string
  admConfirm: boolean
}
@Component({
  selector: 'app-dialogconfirm',
  templateUrl: './dialogconfirm.component.html',
  styleUrls: ['./dialogconfirm.component.css']
})
export class DialogconfirmComponent implements OnInit {
  userForm: FormGroup;
  _response: any = false
  _data : any
  _userService: UserService
  _dialogRef: MatDialogRef<DialogconfirmComponent>

  constructor(private formBuilder: FormBuilder,
       dialogRef: MatDialogRef<DialogconfirmComponent>,
       @Inject(MAT_DIALOG_DATA) data: DialogData,
       userService: UserService) {
    this._dialogRef = dialogRef
    this._userService = userService
    this._data = data
   }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      usuario: [''],
      password: ['']
  });
  }
 validateAdminUser(){
  if(!this.userForm.invalid)
  {
    if(this._userService.validateAdminUser(this.userForm.get('usuario').value,this.userForm.get('password').value))
    {
      this._response = true
      this._dialogRef.close(this._response)
    }
    this._response = false
  }
 }

}
