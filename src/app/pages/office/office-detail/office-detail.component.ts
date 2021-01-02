import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { Country } from 'src/app/models/country.model';
import { Office } from 'src/app/models/office.model';
import { OfficeService } from 'src/app/services/office.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-office-detail',
  templateUrl: './office-detail.component.html',
  styleUrls: ['./office-detail.component.css']
})
export class OfficeDetailComponent implements OnInit {
 office: Office;
 countriesData: Country[];
 controlForm: FormGroup;
  constructor(private activateRoute: ActivatedRoute,
              private builder: FormBuilder,
              private officeService: OfficeService,
              private toastService: ToastService,
              private router: Router,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.office = this.activateRoute.snapshot.data.office as Office;
    this.countriesData = this.activateRoute.snapshot.data.countries as Country[];
    this.controlForm = this.builder.group({
      name: [this.office?.name || '' , [Validators.required, Validators.maxLength(250)]],
      address: [this.office?.address || '' , [Validators.required, Validators.maxLength(250)]],
      postalCode: [this.office?.postalCode || '' , [Validators.required, Validators.maxLength(4)]],
      status: [this.office?.active || ''],
      country: [this.office?.idCountry || '' , Validators.required],
    })
  }
  saveOffice(){
    const office: Office = {
      id: this.office? this.office.id: 0,
      name: this.controlForm.controls.name.value,
      address: this.controlForm.controls.address.value,
      idCountry: parseInt(this.controlForm.controls.country.value,10),
      postalCode: parseInt(this.controlForm.controls.postalCode.value,10),
      active: Boolean(this.controlForm.controls.status.value)
    } 
    this.officeService.add(office).subscribe(() => {  
      this.toastService.success(this.translate.instant( this.office?'OFFICE.ACTIONS.UPDATE': 'OFFICE.ACTIONS.SAVE')),
      this.router.navigate([AppRouting.OfficeList])
      });
  }

}
