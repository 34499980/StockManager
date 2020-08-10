import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { MatDialog } from '@angular/material/dialog';
import { ModaldetailsComponent } from 'src/app/arquitectura/componentes/modaldetails/modaldetails.component';
import { Articulo } from 'src/app/arquitectura/class/Articulo';
import { UserService } from 'src/app/services/user.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-mercaderia',
  templateUrl: './mercaderia.component.html',
  styleUrls: ['./mercaderia.component.css']
})
export class MercaderiaComponent implements OnInit {
  selectFormControl = new FormControl('', [Validators.required]);
  _user: any
  _rowData: any
  _columns: any[] = []
  _usuario: any
  _nombre: any
  _codigo: any
  _modelo: any
  _selectedItem: any
  _sucursal: any
  _marca: any
  _modal: MatDialog
  _visible: boolean = false
  _stockService: StockService
  _arquitecturaService: ArquitecturaService
  constructor(stockService: StockService,arquitecturaService: ArquitecturaService,modal: MatDialog,private userService: UserService,private authentication: AuthenticationService) { 
    this._stockService = stockService
    this._arquitecturaService = arquitecturaService
    this._modal = modal
  }

  ngOnInit(): void {
    this._selectedItem = {name:'loading...'}
    let userSearch = this.authentication.getSession()
    this.userService.getUsuariosByUserName(userSearch).subscribe(res => {this._user = res, 
    this.userService.getAllSucursal().subscribe(res => {this._sucursal = res,
      this.selectFormControl.patchValue({name: this._sucursal.find( x => x.id == this._user.idSucursal)}),
      this._selectedItem =  this._sucursal.find( x => x.id == this._user.idSucursal)
                                                 })
    this._arquitecturaService.getColumnsGridStock().subscribe(res => {this._columns = res})})
    
  }
  searchStock(){
    this._stockService.getStock(this._codigo,
                                this._nombre,
                                this._modelo,
                                this._modelo,
                                this._selectedItem.id,
                                             ).subscribe(res => {
                                                this._rowData = res,
                                                this._visible = true
                                               })
  }
  changeSucursal(sucursal){

  }
  openDialog(value?: Articulo) { 
    let articul: Articulo 
    if(value != undefined){
      this._stockService.getStockByCode(value.code).subscribe(res => {articul = res[0]})
    }else{
      articul = new Articulo
    }    
    const dialogRef = this._modal.open(ModaldetailsComponent, {
       disableClose: true,
       data : { _screen :"articulo",_articul: articul, bDsiable: value!=undefined? true: false}
     });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true){
       
      }
    });
  }

}
