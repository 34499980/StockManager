import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { Dispatch } from 'src/app/models/dispatch';

@Component({
  selector: 'app-dispatch-view-recive',
  templateUrl: './dispatch-view-recive.component.html',
  styleUrls: ['./dispatch-view-recive.component.scss']
})
export class DispatchViewReciveComponent implements OnInit {
  dispatch: Dispatch;
  dataSource = new MatTableDataSource([]);
  displayedColumns = [
    'CODE',
    'NAME',  
    'MODEL',
    'BRAND',
    'UNITY',   
    'ACTIONS'
    
];
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dispatch = this.activatedRoute.snapshot.data.dispatch as Dispatch;
    this.dataSource.data = [...this.dispatch.stock];  
  }
  cancel() {
    this.router.navigate([AppRouting.DispatchList])
  }

}
