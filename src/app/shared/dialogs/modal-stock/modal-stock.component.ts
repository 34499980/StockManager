import { Component, ElementRef, Inject, Input, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { tap, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Country } from 'src/app/models/country.model';
import { Office } from 'src/app/models/office.model';
import { Stock, StockGet, StockPost } from 'src/app/models/stock';
import { Stock_Office } from 'src/app/models/stock_office.model';
import { OfficeService } from 'src/app/services/office.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-modal-stock',
  templateUrl: './modal-stock.component.html',
  styleUrls: ['./modal-stock.component.css']
})
export class ModalStockComponent implements OnInit {
  stockForm: FormGroup;
  officeData$: Observable<Office[]>; 
  countriesData: Country[];
  stock_office: Stock_Office[];
  maxlength: number = 1024;
  stock: StockGet;
  fileSelected: File = null
  url: string;
  cameraImage: SafeResourceUrl;
  image: SafeUrl = '../assets/imageNotFound.png';
  base64textString = [];
  @ViewChild('file') file :ElementRef
  constructor(private builder: FormBuilder,
              private sanitizer: DomSanitizer,
              private officeService: OfficeService,
              private stockService:  StockService,           
              @Inject(MAT_DIALOG_DATA) private data,
              public dialogRef: MatDialogRef<ModalStockComponent>,
              private authentication: AuthenticationService) {
       this.countriesData = data.countriesData; 
       this.stock = data.stock;
       if(this.stock)
       this.cameraImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.stock.file);  
         
               }

  ngOnInit(): void {    
    this.stockForm = this.builder.group({
      code: [this.stock?.code || '' , [Validators.required, Validators.maxLength(10)]],
      name: [this.stock?.name || '' , [Validators.required, Validators.maxLength(250)]],
      brand: [this.stock?.brand || '' , [Validators.required, Validators.maxLength(250)]],
      model: [this.stock?.model || '' , [Validators.required, Validators.maxLength(250)]],
      description: [this.stock?.description || '' , [Validators.maxLength(1024)]],
      idOffice: [this.stock?.idOffice || this.authentication.getCurrentOffice() , [Validators.required]],
      idCountry: [this.stock?.office.idCountry || this.authentication.getCurrentCountry() , [Validators.required]],
      unity: [this.stock?.unity || 0,  [Validators.required]]
      
    })
    this.officeData$ = this.stockForm.controls.idCountry.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => {
       
      }),
      switchMap(val => {
        if(val != null && val != '') {
        return this.officeService.getOfficesByCountry(val);
        }else{
         return of([]);
        }
      })
      );          
    
  }
  OnFileSelected(event){ 
    if (this.url){
      URL.revokeObjectURL(this.url);
    }  
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      this.fileSelected = <File>event.target.files === undefined ? undefined : <File>event.target.files[0]
      if (this.fileSelected) {
        this.url = URL.createObjectURL(this.fileSelected);
        this.cameraImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  
        const blob = new Blob([this.fileSelected], {type: 'image'})
        var reader = new FileReader();
          
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(this.fileSelected);
      }
     
  } 
  selectedOffice(idOffice: number){
   
      let stock_Officelist = this.stock_office?.find(x => x.idOffice === idOffice)
      if(!stock_Officelist){
        const newStockOffice: Stock_Office = {
          id: 0,
          idOffice: idOffice,
          idStock: 0,
          unity: parseInt(this.stockForm.controls.unity.value, 10)
        }
        
      this.stock_office = [...[], newStockOffice]
      }
      

    
  }
  _handleReaderLoaded(e) {
  this.base64textString = [];
  this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
          
   }
  save() {   
    
    const stockPost: StockPost = {
      id: this.stock? this.stock.id : 0,
      code: this.stockForm.controls.code.value,
      name: this.stockForm.controls.name.value,
      brand: this.stockForm.controls.brand.value,
      model: this.stockForm.controls.model.value,
      description: this.stockForm.controls.description.value,
      idState: 1,  
      idOffice: parseInt(this.stockForm.controls.idOffice.value, 10),      
      file: this.base64textString[0] ,
      stock_Office: this.stock_office,
      idCountry: parseInt(this.stockForm.controls.idCountry.value, 10)
    }
    if(!this.stock){
      this.add(stockPost);
    }else{
      this.update(stockPost);
    }
    
   
  }
  add(stockPost: StockPost){
    this.stockService.saveStock(stockPost).subscribe(() => {
      this.dialogRef.close(true);
    })
  }
  update(stockPost: StockPost){
    this.stockService.updaeStock(stockPost).subscribe(() => {
      this.dialogRef.close(true);
    })
  }

}
