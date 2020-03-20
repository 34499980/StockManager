import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paneluser',
  templateUrl: './paneluser.component.html',
  styleUrls: ['./paneluser.component.css']
})
export class PaneluserComponent implements OnInit {
 @Input() Usuario: any
  constructor() { }

  ngOnInit(): void {
    
  }

}
