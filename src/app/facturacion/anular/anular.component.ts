import { Component, OnInit } from '@angular/core';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { UserService } from 'src/app/services/user.service';
import { DialogconfirmComponent } from 'src/app/arquitectura/componentes/dialogconfirm/dialogconfirm.component';
import { MatDialog } from '@angular/material/dialog';
import { FacturacionService } from 'src/app/services/facturacion.service';

@Component({
  selector: 'app-anular',
  templateUrl: './anular.component.html',
  styleUrls: ['./anular.component.css']
})
export class AnularComponent implements OnInit {
  _columnsAnul : any
  _columnsVent : any
  _rowDataAnul: any[] = []
  _fechaDesde: Date
  _fechaHasta: Date
  _usuario: String
  _sucursal: String
  _total: Number
  _ID: Number
  _visible: boolean = false
  _dialog: MatDialog 
  _arquitecturaService: ArquitecturaService
  _userService: UserService
  _facturacionService: FacturacionService
  constructor(arquitecturaService: ArquitecturaService,userService: UserService,dialog: MatDialog,facturacionService: FacturacionService) {
    this._arquitecturaService = arquitecturaService
    this._userService = userService
    this._facturacionService = facturacionService
    this._dialog = dialog
   }

  ngOnInit(): void {
    this._arquitecturaService.getColumnsGridAnular().subscribe(res => {this._columnsAnul = res})
    this._arquitecturaService.getColumnsGridVentas().subscribe(res => {this._columnsVent = res})
    this.searchMovimientosRows()
  }
  searchMovimientosRows(){
    this._userService.getAnularRows(this._fechaDesde,
                                          this._fechaHasta,
                                          this._usuario,
                                          this._sucursal,
                                          this._ID
                                        ).subscribe(res => {
                                          for(let index of res){
                                            this._rowDataAnul.push(index)
                                          }
                                          this._visible = true;
                                          })
  }
  cancelRemito(ID: Number){
    this.openDialog()
   this._ID = ID
    
  }
  openDialog() {    
    const dialogRef = this._dialog.open(DialogconfirmComponent, {
       disableClose: true,
       data : {title: "Confirmación gerente", admConfirm: true}
     });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
        this._facturacionService.cancelRemito(this._ID)
      }
    });
  }

 
}

