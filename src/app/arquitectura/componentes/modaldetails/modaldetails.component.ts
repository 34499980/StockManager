import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, animateChild, query, style, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Articulo } from '../../class/Articulo';
import { StockService } from 'src/app/services/stock.service';
import { Observable } from 'rxjs';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { DispatchService } from 'src/app/services/dispatch.service';
import { UserService } from 'src/app/services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { Dispatch } from '../../class/Dispatch';
import { AuthenticationService } from 'src/app/services/authentication.service';
export interface ModalData {
  _articul: Articulo
  bDsiable: boolean
  _screen: string
  _despacho: string
  
}
class Row{
  id: number
  code: string
  Name: string
  Brand: string
  Model: string
  Price: Number
  Unity: Number
  UnityRead: Number
  Count: Number
  QR: string
  width: number
  height: number
  Stock_Sucursal: any
 
  constructor(articule: Articulo,count: number,unity : number){
    this.id = articule.id
    this.code = articule.code
    this.Name = articule.name
    this.Brand = articule.brand
    this.Model = articule.model
    this.Price = articule.price
    this.QR = articule.qr
    this.Unity = unity
    this.UnityRead = articule.unityRead
    this.Stock_Sucursal = articule.stock_Sucursal
    this.Count = count
    this.width = 2
    this.height = 2
    

  }
}
@Component({
  selector: 'app-modaldetails',
  templateUrl: './modaldetails.component.html',
  styleUrls: ['./modaldetails.component.css'],
})
export class ModaldetailsComponent implements OnInit {
 _modalgRef :  MatDialogRef<ModaldetailsComponent>
 
  selectFormControl = new FormControl('', Validators.required);
    _user: any
   _origen: any
   _destino: any
   _dispatch:any
   _sucursal: any
   _data: ModalData
   _bDsiable: any
   _DisableSucursal: any  
   _selectedItem: any
   _articule: Articulo
   _rowData: any
   _columns: any
   _stockService: StockService 
   _dispatchServices: DispatchService 
   _fileSelected: File = null
   _fileNotSelected: any  
   _arquitecturaService: ArquitecturaService
   _userService: UserService
   @ViewChild('file') file :ElementRef
  constructor(modalgRef: MatDialogRef<ModaldetailsComponent>,private authentication :AuthenticationService ,  stockService: StockService,@Inject(MAT_DIALOG_DATA) data: ModalData,arquitecturaService: ArquitecturaService,dispatchService: DispatchService,private userService: UserService) {
    this._modalgRef = modalgRef
    this._stockService = stockService
    this._data = data
    this._arquitecturaService = arquitecturaService
    this._dispatchServices = dispatchService
    this._userService = userService
   
   

   }

  ngOnInit(): void {
    this._rowData = []
    let userSearch 
    this._selectedItem = [{name: "example", disable: true}]
    this._DisableSucursal = true
    switch(this._data._screen){
      case"articulo":
      if(this._data.bDsiable){
        this._bDsiable = true
      }else{
        this._bDsiable = false
      }
      if(this._data._articul.image == undefined){
        this._fileNotSelected = '../../../../assets/imageNotFound.png'
      }else{
        this._fileNotSelected = this._data._articul.image
      }
       userSearch = this.authentication.getSession()
      this.userService.getUsuariosByUserName(userSearch).subscribe(res => {this._user = res, 
        this._userService.getAllSucursal().subscribe(res => {this._sucursal = res,
        this.selectFormControl.patchValue({name: this._sucursal.find( x => x.id == this._user.idSucursal).name}),
        this._selectedItem =  this._sucursal.find( x => x.id == this._user.idSucursal)
                                                 })
                                                })
      break;
      case"dispatchSelected":
      this._userService.getAllSucursal().subscribe(res => {this._sucursal = res})
        this._arquitecturaService.getDespachoColumnsData().subscribe(res => {this._columns = res} )
        this._dispatchServices.GetDispatchById(this._data._despacho).subscribe(res => {
          this._dispatch = res[0] as Dispatch
          for(let index in this._dispatch.stock){
            this._articule = this._dispatch.stock[index] as Articulo            
            let row           
             row = new Row(this._articule, 0,this._dispatch.dispatch_stock[index].unity)
                  
            
            this._rowData.push(row)
          }})
      break;
      case"createDispatch":
       userSearch = this.authentication.getSession()
      this.userService.getUsuariosByUserName(userSearch).subscribe(res => {this._user = res, 
        this._userService.getAllSucursal().subscribe(res => {this._sucursal = res,
        this.selectFormControl.patchValue({name: this._sucursal.find( x => x.id == this._user.idSucursal)}),
        this._selectedItem =  this._sucursal.find( x => x.id == this._user.idSucursal)
                                                 })
                                                })
      break;
     
    
    }
    
   
  }
  changeSucursal(sucursal,type){
    if( type== "origen"){
      this._origen = sucursal
    }else{
      this._destino = sucursal
    }    
  }
  Add(value?: Number){
    let index
    index = this._rowData.find(x => x.code == value)
   
      index.Unity++      

}
  delete(value?: Number){
    let index = this._rowData.find(x => x.code == value)
    if(index.Unity > 0)
    {
      index.Unity--     
    }     
  }
 
  close(){
    switch (this._data._screen){
      case "createDispatch":    
      /* let dispatch= new Dispatch() 
       dispatch.Code = this._dispatch
       dispatch.Origin = this._origen
       dispatch.Destiny = this._destino */  
        this._modalgRef.close(this._dispatch)   
        break;
        case "dispatchSelected":    
        /* let dispatch= new Dispatch() 
         dispatch.Code = this._dispatch
         dispatch.Origin = this._origen
         dispatch.Destiny = this._destino */  
          this._modalgRef.close(this._dispatch)   
          break;
        default:
          this._modalgRef.close()   
          break;
    }
    
  }
  OnFileSelected(event){   
    this.file.nativeElement.click()
    this._fileSelected = <File>event.target.files == undefined ? undefined : <File>event.target.files[0]
    if(this._fileSelected != undefined){
  
    }
   

  }
  

  cargarCodigo(){
    
    if(this._data._articul.qr.length == 10){
      this.searchArticulo()
     
    }
  }
  searchArticulo(){
    this._stockService.getStockByCode(this._data._articul.qr).subscribe(
      res => {     
        if(res.length > 0){
        this._data._articul = res[0] as Articulo
        this._rowData = res as Articulo
        this._DisableSucursal = false
        this._rowData.unity = res[0].stock_Sucursal.find(x => x.idSucursal ==  this._selectedItem .id).unity
        this._data._articul.unity = res[0].stock_Sucursal.find(x => x.idSucursal ==  this._selectedItem .id).unity
       
        }
        
        
      
    }
    )
   
  }
  saveDispatched(){    
    switch(this._data._screen){
      case 'createDispatch':
        this._dispatchServices.CreateDispatch(this._origen.id,this._destino.id).subscribe(res => {this._dispatch = res,
          this.close()})
        break;
      case 'dispatchSelected':
        for(let index in this._rowData){
          this._dispatch.dispatch_stock.find(x => x.idStock == this._rowData[index].id).Unity = this._rowData[index].Unity 
        }
        this._dispatchServices.UpdateDispatch(this._dispatch).subscribe(res => this.close())
        break;
    }
    
   
   
  }
  updateSucursal(value){
    this._userService.getAllSucursal().subscribe(res => {this._sucursal = res,
    //this._selectedItem =  this._sucursal.find( x => x.name == value)
    this._data._articul.unity =  this._data._articul.stock_Sucursal.find(x => x.idSucursal ==   this._sucursal.find(z => z.name == value).id ).unity
     })
  }
  save(){
    this._data._articul.stock_Sucursal.find(x => x.idSucursal ==   this._sucursal.find(z => z.name ==  this._selectedItem.name).id ).unity = this._data._articul.unity
    this._stockService.saveStock(this._data._articul)
    this.close()
  }

}
