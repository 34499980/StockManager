import { Component, OnInit } from '@angular/core';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { UserService } from 'src/app/services/user.service';
import { PDFService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-anularciones',
  templateUrl: './anularciones.component.html',
  styleUrls: ['./anularciones.component.css']
})
export class AnularcionesComponent implements OnInit {
  rowData: any
  columnDefs: any
  _fechaDesde: Date
  _fechaHasta: Date
  _usuario: String
  _sucursal: String
  _arquitecturaService: ArquitecturaService  
  _userService: UserService
  _pdfService: PDFService
  constructor(arquitecturaService: ArquitecturaService,userService: UserService,pdfService: PDFService) {
    this._arquitecturaService = arquitecturaService
    this._userService = userService
    this._pdfService = pdfService
   }

  ngOnInit(): void {
    this._arquitecturaService.getColumnsGridMovimientos().subscribe(res => {this.columnDefs = res})
    this._userService.getMovimientosRows().subscribe(res => {this.rowData = res})
  }

}
