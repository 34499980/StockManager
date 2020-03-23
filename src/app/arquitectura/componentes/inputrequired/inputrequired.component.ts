import { Component, OnInit, Input } from '@angular/core';
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



  constructor() { }

  ngOnInit(): void {
   if(this.user != null){
     this._value = this.user[0]["Datos"][0][this.param]
   }
    
  }

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
