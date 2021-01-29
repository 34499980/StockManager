import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { Country } from 'src/app/models/country.model';
import { Dispatch } from 'src/app/models/dispatch';
import { Office } from 'src/app/models/office.model';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-dispatch-create',
  templateUrl: './dispatch-create.component.html',
  styleUrls: ['./dispatch-create.component.scss']
})
export class DispatchCreateComponent implements OnInit {
  officesData: Office[];
  countriesData: Country[];
  dispatch: Dispatch;
  @Output() uploadDispatch: EventEmitter<Dispatch> = new EventEmitter<Dispatch>();
  @ViewChild('cdkStepper') cdkStepper: MatStepper
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.officesData = this.activatedRoute.snapshot.data.offices as Office[];
    this.countriesData = this.activatedRoute.snapshot.data.countries as Country[];
  }
  cancel() {
    this.router.navigate([AppRouting.DispatchList])
  }
  next() {   
    this.cdkStepper.next();
  }
  setDispatch(dispatch: Dispatch) {
    this.dispatch = dispatch;
    this.uploadDispatch.emit(dispatch);
    this.next();
  }

}
