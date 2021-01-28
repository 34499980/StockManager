import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouting } from 'src/app/enums/AppRouting.enum';
import { Country } from 'src/app/models/country.model';
import { Office } from 'src/app/models/office.model';

@Component({
  selector: 'app-dispatch-create',
  templateUrl: './dispatch-create.component.html',
  styleUrls: ['./dispatch-create.component.scss']
})
export class DispatchCreateComponent implements OnInit {
  officesData: Office[];
  countriesData: Country[];
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.officesData = this.activatedRoute.snapshot.data.offices as Office[];
    this.countriesData = this.activatedRoute.snapshot.data.countries as Country[];
  }
  cancel() {
    this.router.navigate([AppRouting.DispatchList])
  }
  

}
