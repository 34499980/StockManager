import { Component, OnInit, Input, Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Usuario } from '../../class/usuario';


@Component({
  selector: 'app-inputrequired',
  templateUrl: './inputrequired.component.html',
  styleUrls: ['./inputrequired.component.css']
})
export class InputrequiredComponent implements OnInit {
  formControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  _value: any
  matcher = new MyErrorStateMatcher();
 @Input() param: string
 @Input() type: any
 @Input() inputValue: any
 @Input() array: any
 @Output() _parent = new EventEmitter<any>();
 @ViewChild("input") input: ElementRef
 _parentResponse: string[] = []


  constructor() { }
  ngOnInit(): void {
    if(this.inputValue != null){
      this._value = this.inputValue
      if(this.type == 'date'){
        this.formControl = new FormControl(this._value);
      }
  }
}

  ngOnChanges(): void {
   if(this.inputValue != null){
     this._value = this.inputValue[this.param]
   }
    
  }
  updateValue(){
    this._parentResponse.push(this.param,this._value) 
    this._parent.emit(this._parentResponse)
  }

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
