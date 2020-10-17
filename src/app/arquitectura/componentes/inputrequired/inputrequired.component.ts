import { Component, OnInit, Input, Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ChangeDetectorRef } from '@angular/core';
import { pipe } from 'rxjs';



@Component({
  selector: 'app-inputrequired',
  templateUrl: './inputrequired.component.html',
  styleUrls: ['./inputrequired.component.css']
})
export class InputrequiredComponent implements OnInit {
  formControl:FormGroup;  
  matcher = new MyErrorStateMatcher();
 @Input() placeHolder: string
 @Input() param: string
 @Input() type: any
 @Input() inputValue: any
 @Input() array: any
 @Output() _parent = new EventEmitter<any>();
 @ViewChild("input") input: ElementRef
 _parentResponse: string[] = []


  constructor() { }
  ngOnInit(): void {
    this.formControl = new FormBuilder().group({
      input: [this.inputValue,Validators.required]
    });
    /*if(this.type != 'date'){    
    this.formControl.controls['input'].valueChanges
    .pipe()
    .subscribe(data => {
      this.formControl.controls["input"].setValue(this.inputValue)                                     
    });
  }  */
}
 
  updateValue(){
    this._parentResponse.push(this.param,this.inputValue) 
    this._parent.emit(this._parentResponse)
  }
  ngAfterViewChecked()
{
  if(this.type == 'date' && this.inputValue != undefined){
  this._parentResponse.push(this.param,this.inputValue) 
  this._parent.emit(this._parentResponse)
  }
}

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
