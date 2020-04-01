import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf'
import 'jspdf-autotable'


@Injectable({
  providedIn: 'root'
})
export class PDFService {
 
  constructor() { }

  generarPDF(columns: any, rows: any){
  let doc = new jsPDF();
  let specialElementHandlers = {
    '#editor' : function (element, renderer){
      return true
    }
  };
  
  doc.autoTable({
    styleUrls: ['./style.css'],
   
    columns: 
     columns
    ,
    body: 
    rows
    
  })
  doc.save('table.pdf')

  }











  
}
