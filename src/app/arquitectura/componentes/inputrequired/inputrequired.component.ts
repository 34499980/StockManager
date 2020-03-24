import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-inputrequired',
  templateUrl: './inputrequired.component.html',
  styleUrls: ['./inputrequired.component.css']
})
export class InputrequiredComponent implements OnInit {
  FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  _value: any
  matcher = new MyErrorStateMatcher();
 @Input() param: any
 @Input() type: any
 @Input() user: any
 @Input() array: any
 @Output() _parent = new EventEmitter<any>();
 _parentResponse: string[] = []


  constructor() { }

  ngOnInit(): void {
   if(this.user != null){
     this._value = this.user[0]["Datos"][0][this.param]
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
