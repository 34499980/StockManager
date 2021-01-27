import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css']
})
export class StepOneComponent implements OnInit {
  public stepOneForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.stepOneForm = this.fb.group({
      office: this.fb.control('', Validators.required),
      country: this.fb.control('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  stepOneSubmit() {
  }
}
