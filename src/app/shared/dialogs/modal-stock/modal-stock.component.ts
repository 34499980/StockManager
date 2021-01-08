import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-stock',
  templateUrl: './modal-stock.component.html',
  styleUrls: ['./modal-stock.component.css']
})
export class ModalStockComponent implements OnInit {
  stockForm: FormGroup;
  fileSelected: File = null
  url: string;
  cameraImage: SafeResourceUrl;
  image: string;
  @Input() title: string;
  @ViewChild('file') file :ElementRef
  constructor(private builder: FormBuilder,
              private sanitizer: DomSanitizer,) {
                
               }

  ngOnInit(): void {
    this.stockForm = this.builder.group({
      code: [],
      name: [],
      brand: [],
      model: [],
      description: []
    })
  }
  OnFileSelected(event){   
      this.file.nativeElement.click()
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      this.fileSelected = <File>event.target.files === undefined ? undefined : <File>event.target.files[0]
      console.log(this.fileSelected)
      this.url = URL.createObjectURL(this.fileSelected);
      this.cameraImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
