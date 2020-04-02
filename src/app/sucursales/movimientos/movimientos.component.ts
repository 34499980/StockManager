import { Component, OnInit } from '@angular/core';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {
  rowData: any
  columnDefs: any
  _fechaDesde: Date
  _fechaHasta: Date
  _usuario: String
  _sucursal: String
  _arquitecturaService: ArquitecturaService  
  _userService: UserService
  constructor(arquitecturaService: ArquitecturaService, userService: UserService) {
    this._arquitecturaService = arquitecturaService
    this._userService = userService
    this._arquitecturaService.getColumnsGridMovimientos().subscribe(res => {this.columnDefs = res})
   }

  ngOnInit(): void {
    this._userService.getMovimientosRows().subscribe(res => {this.rowData = res})
  }
  searchMovimientosRows(){
    this._userService.getMovimientosRows(this._fechaDesde,
                                          this._fechaHasta,
                                          this._usuario,
                                          this._sucursal
                                        ).subscribe(res => {this.rowData = res})
  }
 

}
