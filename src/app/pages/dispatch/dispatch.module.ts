import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OfficeResolver } from 'src/app/resolvers/office.resolver';
import { CountriesResolver } from 'src/app/resolvers/countries.resolver';
import { DispatchListComponent } from './dispatch-list/dispatch-list.component';
import { DispatchDetailComponent } from './dispatch-detail/dispatch-detail.component';
import { DispatchResolver } from './dispatch-state.resolver';
import { StepOneComponent } from './steps/step-one/step-one.component';
import { StepTwoComponent } from './steps/step-two/step-two.component';
import { StepThreeComponent } from './steps/step-three/step-three.component';
const routes: Routes = [
  {
    path: 'all',
    component: DispatchListComponent,
    resolve:{  
      countries: CountriesResolver,
      office: OfficeResolver,
      states: DispatchResolver
     
    }
  },
  {
    path: ':id',
    component: DispatchDetailComponent,
    resolve:{
      office: OfficeResolver,
      countries: CountriesResolver,
      states: DispatchResolver
    }
  },
  {
    path: '',
    component: DispatchDetailComponent,
    resolve:{
      office: OfficeResolver,
      countries: CountriesResolver,
      states: DispatchResolver  
    }
  }
  
]


@NgModule({
  declarations: [DispatchDetailComponent, DispatchListComponent, StepOneComponent, StepTwoComponent, StepThreeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [OfficeResolver, CountriesResolver, DispatchResolver]

})
export class DispatchModule { }
