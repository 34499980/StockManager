import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, animateChild, query, style, animate } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockService } from 'src/app/services/stock.service';
import { Observable } from 'rxjs';
import { ArquitecturaService } from 'src/app/services/arquitectura.service';
import { DispatchService } from 'src/app/services/dispatch.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Articulo } from 'src/app/arquitectura/class/Articulo';
import { Dispatch } from 'src/app/arquitectura/class/Dispatch';
import { Item } from 'src/app/arquitectura/class/item.model';
import { Sucursal } from 'src/app/arquitectura/class/sucural.model';
export interface ModalData {
  articul: Articulo
  bDsiable: boolean
  screen: string
  dispatch: number
}

@Component({
  selector: 'app-modaldetails',
  templateUrl: './modaldetails.component.html',
  styleUrls: ['./modaldetails.component.css'],
})
export class ModaldetailsComponent implements OnInit {
 formControl: FormGroup;
 dispatchControl: FormGroup;
    user: any
   _origen: any
   _destino: any
   dispatch: Dispatch
   sucursalData: Sucursal[]
   data: ModalData
   bDsiable: any
   DisableSucursal: any
   _selectedItem: any
   articul: Articulo
   rowData: any[]
   _columns: any
   _fileSelected: File = null
   _fileNotSelected: any
   url: string;
   cameraImage: SafeResourceUrl;
   @ViewChild('file') file :ElementRef
  constructor(private sanitizer: DomSanitizer,
              private formBuilder: FormBuilder,
              private modalgRef: MatDialogRef<ModaldetailsComponent>,
              private authentication :AuthenticationService,
              private stockService: StockService,
              @Inject(MAT_DIALOG_DATA) data: ModalData,
              private arquitecturaService: ArquitecturaService,
              private dispatchService: DispatchService,
              private userService: UserService) {
    this.data = data
    this.articul = data.articul
   }

  ngOnInit(): void {
    this.formControl = this.formBuilder.group({
      qr: [],
      code: [],
      name: [],
      brand: [],
      model: [],
      price: [],
      unity: [],
      unityRead: [],
      count: [],
    })
    this.dispatchControl = this.formBuilder.group({
      origin: [],
      destiny: []
    });
    this.rowData = []
    let userSearch;
    this.DisableSucursal = true
    switch(this.data.screen){
      case 'articulo':
      if(this.data.bDsiable){
        this.bDsiable = true
      }else{
        this.bDsiable = false
      }
      if(this.articul.image === undefined){
        this._fileNotSelected = '../../../../assets/imageNotFound.png'
      }else{
        this._fileNotSelected = this.articul.image
      }
      userSearch = this.authentication.getSession()
      this.userService.getUsuariosByUserName(userSearch).subscribe(res => {this.user = res,
        this.userService.getAllSucursal().subscribe(result => {this.sucursalData = result,
       // this.formCOntrol.patchValue({name: this.sucursalData.find( x => x.id === this.user.idSucursal).name}),
        this._selectedItem =  this.sucursalData.find( x => x.id === this.user.idSucursal)
                                                 })
                                                })
      break;
      case 'dispatchSelected':
      this.userService.getAllSucursal().subscribe(res => {this.sucursalData = res})
        this.arquitecturaService.getDespachoColumnsData().subscribe(res => {this._columns = res} )
        this.dispatchService.GetDispatchById(this.data.dispatch).subscribe(res => {
          this.dispatch = res as Dispatch
        })
         /* for(let index in this.dispatch.stock){
            this.articul = this.dispatch.stock[index] as Articulo
            let row
             row = new Row(this.articul, 0,this.dispatch.dispatch_stock[index].unity)

            this._rowData.push(row)
          }})*/
      break;
      case 'createDispatch':
       userSearch = this.authentication.getSession()
        this.userService.getUsuariosByUserName(userSearch).subscribe(res => {this.user = res,
        this.userService.getAllSucursal().subscribe(result => {this.sucursalData = result,
       // this.selectFormControl.patchValue({name: this.sucursalData.find( x => x.id == this.user.idSucursal)}),
        this._selectedItem =  this.sucursalData.find( x => x.id === this.user.idSucursal)
                                                 })
                                                })
      break;
    }
  }
  Add(value?: number){
    const index = this.rowData.find(x => x.code === value)
    index.Unity++

}
  delete(value?: number){
    const index = this.rowData.find(x => x.code === value)
    if(index.Unity > 0)
    {
      index.Unity--
    }
  }
  close(){
    switch (this.data.screen){
      case 'createDispatch':
      /* let dispatch= new Dispatch()
       dispatch.Code = this._dispatch
       dispatch.Origin = this._origen
       dispatch.Destiny = this._destino */
        this.modalgRef.close(this.dispatch)
        break;
        case 'dispatchSelected':
        /* let dispatch= new Dispatch()
         dispatch.Code = this._dispatch
         dispatch.Origin = this._origen
         dispatch.Destiny = this._destino */
          this.modalgRef.close(this.dispatch)
          break;
        default:
          this.modalgRef.close()
          break;
    }
  }
  OnFileSelected(event){
    this.file.nativeElement.click()
    // tslint:disable-next-line: no-angle-bracket-type-assertion
    this._fileSelected = <File>event.target.files === undefined ? undefined : <File>event.target.files[0]
    this.url = URL.createObjectURL(this._fileSelected);
    this.cameraImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    console.log(this._fileSelected)
    if(this._fileSelected !== undefined){
    }
  }

  cargarCodigo(){
    if(this.articul.qr.length === 10){
      this.searchArticul()
    }
  }
  searchArticul(){
    this.stockService.getStockByCode(this.articul.qr).subscribe(
      res => {
        if(res.length > 0){
        this.articul = res as Articulo
        this.rowData.push(res)
        this.DisableSucursal = false
      //  this.rowData.unity = res[0].stock_Sucursal.find(x => x.idSucursal ===  this._selectedItem .id).unity
        this.articul.unity = res[0].stock_Sucursal.find(x => x.idSucursal ===  this._selectedItem .id).unity
        }
      }
    )
  }
  saveDispatched(){
    switch(this.data.screen){
      case 'createDispatch':
        this.dispatchService.CreateDispatch(this._origen.id,this._destino.id).subscribe(res => {this.dispatch = res,
          this.close()})
        break;
      case 'dispatchSelected':
        // tslint:disable-next-line: forin
        for(const index in this.rowData){
          const disp =  this.dispatch.dispatch_stock.find(x => x.idStock === this.rowData[index].id);
          disp.unity = this.rowData[index].unity;
        }
        this.dispatchService.UpdateDispatch(this.dispatch).subscribe(res => this.close())
        break;
    }
  }
  updateSucursal(value){
    this.userService.getAllSucursal().subscribe(res => {this.sucursalData = res,
    this.articul.unity =  this.articul.stock_Sucursal.find(x => x.idSucursal === this.sucursalData.find(z => z.name === value).id ).unity
     })
  }
  save(){
   const index = this.articul.stock_Sucursal.find(x => x.idSucursal ===  this.sucursalData.find(z => z.name === this._selectedItem.name).id)
   index.unity = this.articul.unity
    this.stockService.saveStock(this.articul)
    this.close()
  }

}
