import { Component, OnInit } from '@angular/core';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';

@Component({
  selector: 'app-anular',
  templateUrl: './anular.component.html',
  styleUrls: ['./anular.component.css']
})
export class AnularComponent implements OnInit {
  _columnsAnul : any
  _columnsVent : any
  _arquitecturaService: ArquitecturaService
  constructor(arquitecturaService: ArquitecturaService) {
    this._arquitecturaService = arquitecturaService
   }

  ngOnInit(): void {
    this._arquitecturaService.getColumnsGridAnular().subscribe(res => {this._columnsAnul = res})
    this._arquitecturaService.getColumnsGridVentas().subscribe(res => {this._columnsVent = res})
  }

}
