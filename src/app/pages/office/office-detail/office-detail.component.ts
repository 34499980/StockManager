import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Office } from 'src/app/models/office.model';

@Component({
  selector: 'app-office-detail',
  templateUrl: './office-detail.component.html',
  styleUrls: ['./office-detail.component.css']
})
export class OfficeDetailComponent implements OnInit {
 office: Office;
 controlForm: FormGroup;
  constructor(private activateRoute: ActivatedRoute,
              private builder: FormBuilder) { }

  ngOnInit(): void {
    this.office = this.activateRoute.snapshot.data.office as Office;
    this.controlForm = this.builder.group({
      name: [this.office?.name || '' , [Validators.required, Validators.maxLength(250)]],
      address: [this.office?.address || '' , [Validators.required, Validators.maxLength(250)]],
      postalCode: [this.office?.postalCode || '' , [Validators.required, Validators.maxLength(4)]],
      status: [this.office?.active || '']
    })
  }
  saveOffice(){

  }

}
