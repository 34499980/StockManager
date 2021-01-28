import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dispatch } from 'src/app/models/dispatch';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {
  public stepTwoForm: FormGroup;
  @Input() dispatch: Dispatch;
  constructor() { }

  ngOnInit(): void {
  }

}
