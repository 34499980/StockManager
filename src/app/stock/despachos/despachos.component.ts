import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { Articulo } from 'src/app/arquitectura/class/Articulo';
import { DialogconfirmComponent } from 'src/app/arquitectura/componentes/dialogconfirm/dialogconfirm.component';
import { MatDialog } from '@angular/material/dialog';
import { ModaldetailsComponent } from 'src/app/arquitectura/componentes/modaldetails/modaldetails.component';
import { DispatchService } from 'src/app/services/dispatch.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { Dispatch } from 'src/app/arquitectura/class/Dispatch';

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
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})
export class DespachosComponent implements OnInit {
  _type: string
  _states: any
  _despacho: String
  _dispatch: any
  _rowData: any[]=[]
  _rowDataDispatchedOrigin: any[]=[]
  _columns: any
 _disableButton: boolean 
 _articule: Articulo
 _searchCode: any
  _OkImage: string
  _NotOkImage: string
  _stockService: StockService
  _titleButtonCreate : string
  _arquitecturaService: ArquitecturaService
  _dispatchService: DispatchService
  _dialog: MatDialog
  _modal: MatDialog
  _codeFlag : boolean
  constructor(stockService: StockService,dispatchService: DispatchService, arquitecturaService: ArquitecturaService,dialog: MatDialog,modal: MatDialog,
    private authenticationService : AuthenticationService, private userService: UserService) { 
    this._stockService = stockService
    this._arquitecturaService = arquitecturaService
    this._dispatchService = dispatchService
    this._dialog = dialog
    this._modal = modal
  }

  ngOnInit(): void {
    this._codeFlag =  false
    this._type = "dispatched"
    this._OkImage = '../../../../assets/ok_check.png'
    this._NotOkImage = '../../../../assets/notok_check.png'
    this._despacho = ""
    this._titleButtonCreate = "Create" 
    this._rowData = []
    this._disableButton = false  
    this._searchCode = undefined
    this._dispatchService.GetDispatchStates().subscribe(res => {this._states = res})
    this._arquitecturaService.getDespachoColumns().subscribe(res => {this._columns = res})
    let user = this.authenticationService.getSession() 
    this.userService.getUsuariosByUserName(user).subscribe(res => {user = res})
    this._dispatchService.GetAllDispatchBySucursal().subscribe(res => {
                                                                        for(let index in res){
                                                                          let row = res[index] as Dispatch
                                                                          row.stateText = row.idState == this._states.find(x => x.description == "Despachado").id && row.destiny == user.idSucursal? "Recibir": "Ver"
                                                                          this._rowData.push(row)

                                                                      }})
    
  }
  searchDespatched(){ 
     if(this._despacho.length == 10){
      this._type = "dispatchedSelected"
      this._disableButton = true
      this._titleButtonCreate = "Salir" 
      this._rowData = []
     // this._stockService.getStockByCode(this._despacho).subscribe(res => {this._rowData = res})
      this._arquitecturaService.getDespachoColumnsData().subscribe(res => {this._columns = res})     
     } else{
      this._arquitecturaService.openDialog("Error","Ingreso un formato de despacho incorrecto")
     }       
  
  }  
  assignDispatched(dispatched: string){
    
    this._despacho = dispatched
    let user = this.authenticationService.getSession()   
  
    this._dispatchService.GetDispatchById(dispatched).subscribe(res  => {this._dispatch = res,
      
        this._dispatch = res[0] as Dispatch
     
      this.userService.getUsuariosByUserName(user).subscribe(res => {user = res,this.setDispatchStyle(user,dispatched)})
    })
    
   
    
        
  }
  setDispatchStyle(user,code){
    if(this._dispatch.origin == user.idSucursal){
      if(this._dispatch.idState != this._states.find(x => x.description == "Creado").id){
        this._codeFlag = true
      }
          this._type = "newDispatched" 
          this._disableButton = true
          this._titleButtonCreate = "Salir" 
          this._rowData = []         
          this.fillDespacho()   
             
            
     
    }else{
      if(this._dispatch.idState == this._states.find(x => x.description == "Despachado").id)
      {
        this._dispatchService.GetDispatchById(code).subscribe(res  => {  this._dispatch = res[0] as Dispatch})
        this._dispatch.idState = this._states.find(x => x.description == "Recibido").id
        this._dispatchService.UpdateDispatch(this._dispatch).subscribe()
        let row = this._rowData.find(x => x.code == code)
        row.stateText = "Ver"
      }else{
        this._type = "dispatchedSelected"
        this._codeFlag = this._dispatch.idState == this._states.find(x => x.description == "Recibido").id ? false : true
        this._disableButton = true
        this._titleButtonCreate = "Salir" 
        this._rowData = []
        this.fillDespacho()
      }
    }
    
  }
  fillDespacho(){  
      for(let index in this._dispatch.stock){
        this._articule = this._dispatch.stock[index] as Articulo 
        this._articule.unityRead =  this._dispatch.dispatch_stock.find(x => x.idStock == this._articule.code).unityRead
        let row
        if( this._type == "newDispatched"){
           row = Object.assign({},new Row(this._articule,this._dispatch.dispatch_stock[index].unity,this._articule.stock_Sucursal.find(x => x.idSucursal == this._dispatch.origin).unity))
        }else{
           row = Object.assign({},new Row(this._articule, 0,this._dispatch.dispatch_stock[index].unity))
        }       
        
        this._rowData.push(row)
      }
    
      this._arquitecturaService.getDespachoColumnsData().subscribe(res => {this._columns = res}) 
  }
  UpdateDispatch(){
    if(this._disableButton){
      switch(this._type){
        case "dispatchedSelected":
          for(let index in this._rowData){
          this._dispatch.dispatch_stock.find(x => x.idStock == this._rowData[index].id).UnityRead =  this._rowData[index].UnityRead
          }
          break;
        case "newDispatched":
          for(let index in this._dispatch.stock){
            this._dispatch.stock[index].unity = this._rowData.find(x => x.code == this._dispatch.stock[index].code) != undefined?  this._rowData.find(x => x.code == this._dispatch.stock[index].code).Count : 0
           
          }
          break;
      }     
     
     // this._dispatch.dispatch_stock = null
      this._dispatchService.UpdateDispatch(this._dispatch).subscribe()
    
     this.ngOnInit()
    }else{     
      this.openModal("createDispatch")

    }
  }
  cargarCodigo(){
    if(this._searchCode.length == 10){
      //this.searchArticulo()
      this.Add(this._searchCode)
      this._searchCode = undefined
    }
  }
  searchArticulo(){
    this._dispatchService.GetDispatchById(this._despacho).subscribe(
      res => {     
      for(let index in res){
        this._articule = res[index] as Articulo
        //let row = new Row(this._articule);
        //this._rowData.push(row)
      }
    }
    )
   
  }
  cargarDespacho(){
    if(this._despacho==" " || this._despacho==undefined || this._despacho.length == 0){
      this._dispatchService.GetAllDispatchBySucursal().subscribe(res => {this._rowData = res})
    }else{    
      this._rowData = [] 
      this._dispatchService.GetAllDispatchBySucursal().subscribe(res => {this._rowDataDispatchedOrigin = res})
      for(let index in this._rowDataDispatchedOrigin){
        let row = this._rowDataDispatchedOrigin[index] 
        if(row.ID.indexOf(this._despacho) != -1){
          this._rowData.push(row)
        }

      }    
  
    }
  }
  Add(value?: Number){
    let index
    switch(this._type){
      case "newDispatched":
        index = this._rowData.find(x => x.code == value)
        if(index!=undefined){
          if(index.Count < index.Unity)
            index.Count++
            index.Stock_Sucursal[0].unity --
            this._dispatch.stock.find(x => x.code ==value).stock_Sucursal.find(x => x.idSucursal == this._dispatch.origin).unity
        }else{
          this._stockService.getStockByCode(value.toString()).subscribe(
            res => {     
            for(let index in res){
              if(res[0].stock_Sucursal.find(x => x.idSucursal == this._dispatch.origin).unity > 0){
              this._articule = res[index] as Articulo
              let row = new Row(this._articule, 1,this._articule.stock_Sucursal.find(x => x.idSucursal == this._dispatch.origin).unity)
              this._rowData.push(row)
              row.Stock_Sucursal[0].unity --
            }
              //this._dispatch.stock.push(Object.assign({},res))
             
            }
          }
          )
          
        }
    break;
      case "createDispached":
          index = this._rowData.find(x => x.code == value)
          if(index!=undefined){
            if(index.Count < index.Unity)
              index.Count++
              index.Stock_Sucursal[0].unity --
              this._dispatch.stock.find(x => x.code ==value).stock_Sucursal.find(z  => z.idSucursal == this._dispatch.origin).unity--
          }else{
            this._stockService.getStockByCode(value.toString()).subscribe(
              res => {     
              for(let index in res){
                if(res[0].stock_Sucursal.find(x => x.idSucursal == this._dispatch.origin).unity > 0){
                this._articule = res[index] as Articulo
                let row = new Row(this._articule, 1,this._articule.stock_Sucursal.find(x => x.idSucursal == this._dispatch.origin).unity)
                this._dispatch.Stock_Sucursal[0].unity --
                this._rowData.push(row)
                this._dispatch.stock.push(Object.assign({},this._articule))
                }
              }
            })
          
          }
      break;
      case "dispatchedSelected":
         let row = this._rowData.find(x => x.code == value)
         if(row.UnityRead < row.Unity)
             row.UnityRead++
        break;
      default:
      
      if(value != undefined){      
         index = this._rowData.find(x => x.code == value)
      }else{
        index = this._rowData.find(x => x.code == this._articule.code)
      }
      if(index.Count < index.Stock_Sucursal[0].unity && (index.Count == 0 && this._searchCode != undefined)){
          index.Count++     
          index.Stock_Sucursal[0].unity -- 
          this._dispatch.stock.find(x => x.code ==value).stock_Sucursal.find(z  => z.idSucursal == this._dispatch.origin).unity--
       
    }else{
      if(index.Count < index.Stock_Sucursal[0].unity && (index.Count >0)){
        index.Count++      
        index.Stock_Sucursal[0].unity --
        this._dispatch.stock.find(x => x.code ==value).stock_Sucursal.find(z  => z.idSucursal == this._dispatch.origin).unity--
    }
   }
      break;
    }
    this._dispatch.stock = this._rowData
   
  }
  delete(value?: Number){
    let index = this._rowData.find(x => x.code == value)
    switch(this._type){
      case "dispatchedSelected":
        if(index != undefined && index.UnityRead > 0)
        {
          index.UnityRead--    
        
          //this._dispatch.stock.find(x => x.Code ==value).Stock_Sucursal.find(z => z.idSucursal == this._dispatch.idSucursal).unity++
        }   
        break;

        default:
   
    if(index != undefined && index.Count > 0)
    {
      index.Count--    
      index.Stock_Sucursal[0].unity ++ 
      //this._dispatch.stock.find(x => x.Code ==value).Stock_Sucursal.find(z => z.idSucursal == this._dispatch.idSucursal).unity++
    } 
    if(index.Count == 0 && this._type != "dispatchedSelected"){
      this._rowData = this._rowData.filter(x => x.code != index.code)
    }   
    break; 
  }
   
  }
  finish(){
    if(this._rowData.length != 0){
      switch(this._type){
        case "createDispached":        
        //this._arquitecturaService.openDialog("Message","Se genero el despacho con numero: "+newDispacher)  
         this.ngOnInit()
        break;
        case "newDispatched":  
        this._dispatch.idState = 2   
        this.UpdateDispatch()
         this.ngOnInit()
        break;
        case "dispatchedSelected": 
        let bFlag = this._rowData.find(x => x.UnityRead != x.Unity)
        if(!bFlag){
          this._dispatch.idState = 4   
          this.UpdateDispatch()
           this.ngOnInit()
        }else{
          this._arquitecturaService.openDialog('Warning','Quedaron bultos sin leer!')
        }
       
        break;
      
    }
  } 
  }
  openDialog() {    
    const dialogRef = this._dialog.open(DialogconfirmComponent, {
       disableClose: true,
       data : {title: "Confirmación gerente", admConfirm: true}
     });

    dialogRef.afterClosed().subscribe(result => {
      if(true){
        this.openModal("dispatchSelected")
      }
    });
  }
  openModal(type) { 
  
    const dialogRef = this._modal.open(ModaldetailsComponent, {
       disableClose: true,
       data : {_despacho:this._despacho, _screen: type}
     });

    dialogRef.afterClosed().subscribe(result => {
      
        if(result != undefined && result != false){
          if(this._type != 'dispatchedSelected'){
         // this._type = "createDispached"
            this._disableButton = true
            this._titleButtonCreate = "Salir"          
            this._arquitecturaService.getDespachoColumnsData().subscribe(res => {this._columns = res})     
            this._rowData = []
             this._despacho = result.code
             this._dispatch = result
             this._type = "newDispatched"
             this.fillDespacho()
          }else{
            this._rowData = []
            this.assignDispatched(result.code)
          }
        }
        
      
    });
  }
  remove(value?: Number,i?: number){
    let index = this._rowData.find(x => x.code == value)
    this._rowData.splice(i,1)
   
  }


}

