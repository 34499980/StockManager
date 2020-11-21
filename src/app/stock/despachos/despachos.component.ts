import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { Articulo } from 'src/app/arquitectura/class/Articulo';
import { MatDialog } from '@angular/material/dialog';
import { DispatchService } from 'src/app/services/dispatch.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { Dispatch } from 'src/app/arquitectura/class/Dispatch';
import { ModaldetailsComponent } from 'src/app/arquitectura/componentes/dialogs/modaldetails/modaldetails.component';
import { DialogconfirmComponent } from 'src/app/arquitectura/componentes/dialogs/dialogconfirm/dialogconfirm.component';

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})
export class DespachosComponent implements OnInit {
  _type: string
  _states: any
  dispatch: number
  _dispatch: any
  rowData: any[]=[]
  _rowDataDispatchedOrigin: any[]=[]
  _columns: any
 _disableButton: boolean
 articule: Articulo
 _searchCode: any
  _OkImage: string
  _NotOkImage: string 
  _titleButtonCreate : string
  _codeFlag : boolean
  constructor(private stockService: StockService,
              private dispatchService: DispatchService,
              private arquitecturaService: ArquitecturaService,
              private dialog: MatDialog,
              private modal: MatDialog,
              private authenticationService : AuthenticationService,
              private userService: UserService) {
    this.dialog = dialog
    this.modal = modal
  }

  ngOnInit(): void {
    this._codeFlag =  false
    this._type = 'dispatched'
    this._OkImage = '../../../../assets/ok_check.png'
    this._NotOkImage = '../../../../assets/notok_check.png'
    this._titleButtonCreate = 'Create'
    this.rowData = []
    this._disableButton = false
    this._searchCode = undefined
    this.dispatchService.GetDispatchStates().subscribe(res => {this._states = res})
    this.arquitecturaService.getDespachoColumns().subscribe(res => {this._columns = res})
    let user = this.authenticationService.getSession() 
    this.userService.getUsuariosByUserName(user).subscribe(res => {user = res})
    this.dispatchService.GetAllDispatchBySucursal().subscribe(res => {
                                                                        for(let index in res){
                                                                          let row = res[index] as Dispatch
                                                                          row.stateText = row.idState === this._states.find(x => x.description === 'Despachado').id && row.destiny === user.idSucursal? 'Recibir': 'Ver'
                                                                          this.rowData.push(row)

                                                                      }})
    
  }
  searchDespatched(){
     if(this.dispatch.length ==== 10){
      this._type = 'dispatchedSelected'
      this._disableButton = true
      this._titleButtonCreate = 'Salir'
      this.rowData = []
     // this._stockService.getStockByCode(this._despacho).subscribe(res => {this._rowData = res})
      this.arquitecturaService.getDespachoColumnsData().subscribe(res => {this._columns = res})     
     } else{
      this.arquitecturaService.openDialog('Error','Ingreso un formato de despacho incorrecto')
     }       
  
  }  
  assignDispatched(dispatched: number){
    
    this.dispatch = dispatched
    let user = this.authenticationService.getSession()   
  
    this.dispatchService.GetDispatchById(dispatched).subscribe(res  => {this._dispatch = res,
      
        this._dispatch = res[0] as Dispatch
     
      this.userService.getUsuariosByUserName(user).subscribe(res => {user = res,this.setDispatchStyle(user,dispatched)})
    })
    
   
    
        
  }
  setDispatchStyle(user,code){
    if(this._dispatch.origin === user.idSucursal){
      if(this._dispatch.idState !== this._states.find(x => x.description === 'Creado').id){
        this._codeFlag = true
      }
          this._type = 'newDispatched' 
          this._disableButton = true
          this._titleButtonCreate = 'Salir' 
          this.rowData = []         
          this.fillDespacho()   
             
            
     
    }else{
      if(this._dispatch.idState === this._states.find(x => x.description === 'Despachado').id)
      {
        this.dispatchService.GetDispatchById(code).subscribe(res  => {  this._dispatch = res[0] as Dispatch})
        this._dispatch.idState = this._states.find(x => x.description === 'Recibido').id
        this.dispatchService.UpdateDispatch(this._dispatch).subscribe()
        let row = this.rowData.find(x => x.code === code)
        row.stateText = 'Ver'
      }else{
        this._type = 'dispatchedSelected'
        this._codeFlag = this._dispatch.idState === this._states.find(x => x.description === 'Recibido').id ? false : true
        this._disableButton = true
        this._titleButtonCreate = 'Salir' 
        this.rowData = []
        this.fillDespacho()
      }
    }
    
  }
  fillDespacho(){  
      for(let index in this._dispatch.stock){
        this.articule = this._dispatch.stock[index] as Articulo 
        this.articule.unityRead =  this._dispatch.dispatch_stock.find(x => x.idStock === this.articule.code).unityRead
        let row
        if( this._type === 'newDispatched'){
           row = Object.assign({},new Row(this.articule,this._dispatch.dispatch_stock[index].unity,this.articule.stock_Sucursal.find(x => x.idSucursal === this._dispatch.origin).unity))
        }else{
           row = Object.assign({},new Row(this.articule, 0,this._dispatch.dispatch_stock[index].unity))
        }       
        
        this.rowData.push(row)
      }
    
      this.arquitecturaService.getDespachoColumnsData().subscribe(res => {this._columns = res}) 
  }
  UpdateDispatch(){
    if(this._disableButton){
      switch(this._type){
        case 'dispatchedSelected':
          for(let index in this.rowData){
          this._dispatch.dispatch_stock.find(x => x.idStock === this.rowData[index].id).UnityRead =  this.rowData[index].UnityRead
          }
          break;
        case 'newDispatched':
          for(let index in this._dispatch.stock){
            this._dispatch.stock[index].unity = this.rowData.find(x => x.code === this._dispatch.stock[index].code) !== undefined?  this.rowData.find(x => x.code === this._dispatch.stock[index].code).Count : 0
           
          }
          break;
      }     
     
     // this._dispatch.dispatch_stock = null
      this.dispatchService.UpdateDispatch(this._dispatch).subscribe()
    
     this.ngOnInit()
    }else{     
      this.openModal('createDispatch')

    }
  }
  cargarCodigo(){
    if(this._searchCode.length === 10){
      //this.searchArticulo()
      this.Add(this._searchCode)
      this._searchCode = undefined
    }
  }
  searchArticulo(){
    this.dispatchService.GetDispatchById(this.dispatch).subscribe(
      res => {     
      for(let index in res){
        this.articule = res[index] as Articulo
        //let row = new Row(this._articule);
        //this._rowData.push(row)
      }
    }
    )
   
  }
  cargarDespacho(){
    if(this.dispatch===' ' || this.dispatch===undefined || this.dispatch.length === 0){
      this.dispatchService.GetAllDispatchBySucursal().subscribe(res => {this.rowData = res})
    }else{    
      this.rowData = [] 
      this.dispatchService.GetAllDispatchBySucursal().subscribe(res => {this._rowDataDispatchedOrigin = res})
      for(let index in this._rowDataDispatchedOrigin){
        let row = this._rowDataDispatchedOrigin[index] 
        if(row.ID.indexOf(this.dispatch) !== -1){
          this.rowData.push(row)
        }

      }    
  
    }
  }
  Add(value?: string){
    let index
    switch(this._type){
      case 'newDispatched':
        index = this.rowData.find(x => x.code === value)
        if(index!==undefined){
          if(index.Count < index.Unity)
            index.Count++
            index.Stock_Sucursal[0].unity --
            this._dispatch.stock.find(x => x.code ===value).stock_Sucursal.find(x => x.idSucursal === this._dispatch.origin).unity
        }else{
          this.stockService.getStockByCode(value.toString()).subscribe(
            res => {     
            for(let index in res){
              if(res[0].stock_Sucursal.find(x => x.idSucursal === this._dispatch.origin).unity > 0){
              this.articule = res[index] as Articulo
              let row = new Row(this.articule, 1,this.articule.stock_Sucursal.find(x => x.idSucursal === this._dispatch.origin).unity)
              this.rowData.push(row)
              row.Stock_Sucursal[0].unity --
            }
              //this._dispatch.stock.push(Object.assign({},res))
             
            }
          }
          )
          
        }
    break;
      case 'createDispached':
          index = this.rowData.find(x => x.code === value)
          if(index!==undefined){
            if(index.Count < index.Unity)
              index.Count++
              index.Stock_Sucursal[0].unity --
              this._dispatch.stock.find(x => x.code ===value).stock_Sucursal.find(z  => z.idSucursal === this._dispatch.origin).unity--
          }else{
            this.stockService.getStockByCode(value.toString()).subscribe(
              res => {     
              for(let index in res){
                if(res[0].stock_Sucursal.find(x => x.idSucursal === this._dispatch.origin).unity > 0){
                this.articule = res[index] as Articulo
                let row = new Row(this.articule, 1,this.articule.stock_Sucursal.find(x => x.idSucursal === this._dispatch.origin).unity)
                this._dispatch.Stock_Sucursal[0].unity --
                this.rowData.push(row)
                this._dispatch.stock.push(Object.assign({},this.articule))
                }
              }
            })
          
          }
      break;
      case 'dispatchedSelected':
         let row = this.rowData.find(x => x.code === value)
         if(row.UnityRead < row.Unity)
             row.UnityRead++
        break;
      default:
      
      if(value !== undefined){      
         index = this.rowData.find(x => x.code === value)
      }else{
        index = this.rowData.find(x => x.code === this.articule.code)
      }
      if(index.Count < index.Stock_Sucursal[0].unity && (index.Count === 0 && this._searchCode !== undefined)){
          index.Count++     
          index.Stock_Sucursal[0].unity -- 
          this._dispatch.stock.find(x => x.code ===value).stock_Sucursal.find(z  => z.idSucursal === this._dispatch.origin).unity--
       
    }else{
      if(index.Count < index.Stock_Sucursal[0].unity && (index.Count >0)){
        index.Count++      
        index.Stock_Sucursal[0].unity --
        this._dispatch.stock.find(x => x.code ===value).stock_Sucursal.find(z  => z.idSucursal === this._dispatch.origin).unity--
    }
   }
      break;
    }
    this._dispatch.stock = this.rowData
   
  }
  delete(value?: number){
    let index = this.rowData.find(x => x.code === value)
    switch(this._type){
      case 'dispatchedSelected':
        if(index !== undefined && index.UnityRead > 0)
        {
          index.UnityRead--    
        
          //this._dispatch.stock.find(x => x.Code ===value).Stock_Sucursal.find(z => z.idSucursal === this._dispatch.idSucursal).unity++
        }   
        break;

        default:
   
    if(index !== undefined && index.Count > 0)
    {
      index.Count--    
      index.Stock_Sucursal[0].unity ++ 
      //this._dispatch.stock.find(x => x.Code ===value).Stock_Sucursal.find(z => z.idSucursal === this._dispatch.idSucursal).unity++
    } 
    if(index.Count === 0 && this._type !== 'dispatchedSelected'){
      this.rowData = this.rowData.filter(x => x.code !== index.code)
    }   
    break; 
  }
   
  }
  finish(){
    if(this.rowData.length !== 0){
      switch(this._type){
        case 'createDispached':        
        //this._arquitecturaService.openDialog('Message','Se genero el despacho con numero: '+newDispacher)  
         this.ngOnInit()
        break;
        case 'newDispatched':  
        this._dispatch.idState = 2   
        this.UpdateDispatch()
         this.ngOnInit()
        break;
        case 'dispatchedSelected': 
        let bFlag = this.rowData.find(x => x.UnityRead !== x.Unity)
        if(!bFlag){
          this._dispatch.idState = 4   
          this.UpdateDispatch()
           this.ngOnInit()
        }else{
          this.arquitecturaService.openDialog('Warning','Quedaron bultos sin leer!')
        }
       
        break;
      
    }
  } 
  }
  openDialog() {    
    const dialogRef = this.dialog.open(DialogconfirmComponent, {
       disableClose: true,
       data : {title: 'Confirmación gerente', admConfirm: true}
     });

    dialogRef.afterClosed().subscribe(result => {
      if(true){
        this.openModal('dispatchSelected')
      }
    });
  }
  openModal(type) { 
  
    const dialogRef = this.modal.open(ModaldetailsComponent, {
       disableClose: true,
       data : {_despacho:this.dispatch, _screen: type}
     });

    dialogRef.afterClosed().subscribe(result => {
      
        if(result !== undefined && result !== false){
          if(this._type !== 'dispatchedSelected'){
         // this._type = 'createDispached'
            this._disableButton = true
            this._titleButtonCreate = 'Salir'          
            this.arquitecturaService.getDespachoColumnsData().subscribe(res => {this._columns = res})     
            this.rowData = []
             this.dispatch = result.code
             this._dispatch = result
             this._type = 'newDispatched'
             this.fillDespacho()
          }else{
            this.rowData = []
            this.assignDispatched(result.code)
          }
        }
        
      
    });
  }
  remove(value?: number,i?: number){
    let index = this.rowData.find(x => x.code === value)
    this.rowData.splice(i,1)
   
  }


}

