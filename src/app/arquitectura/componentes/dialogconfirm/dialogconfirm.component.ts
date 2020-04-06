import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-dialogconfirm',
  templateUrl: './dialogconfirm.component.html',
  styleUrls: ['./dialogconfirm.component.css']
})
export class DialogconfirmComponent implements OnInit {
  _usuario: string
  _password: string
  constructor() { }

  ngOnInit(): void {
  }
 

}
