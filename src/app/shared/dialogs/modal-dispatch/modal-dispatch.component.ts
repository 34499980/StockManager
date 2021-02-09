import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Dispatch } from 'src/app/models/dispatch';

@Component({
  selector: 'app-modal-dispatch',
  templateUrl: './modal-dispatch.component.html',
  styleUrls: ['./modal-dispatch.component.css']
})
export class ModalDispatchComponent implements OnInit {
  dispatch: Dispatch
  dataSource = new MatTableDataSource([]);  
  displayedColumns = [
    'CODE',
    'NAME',  
    'MODEL',
    'BRAND',
    'UNITY',   
    'ACTIONS',
    
  ]
  constructor(@Inject(MAT_DIALOG_DATA) private data,
              public dialogRef: MatDialogRef<ModalDispatchComponent>) {
    this.dispatch = data.dispatch
   }

  ngOnInit(): void {
    this.dataSource.data = [...this.dispatch.stock];  
  }
  save() {
    this.dialogRef.close(this.dispatch);
  }

}
