import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OfficeListComponent } from './office-list/office-list.component';
import { OfficeDetailComponent } from './office-detail/office-detail.component';
import { OfficeResolver } from 'src/app/resolvers/office.resolver';
import { CountriesResolver } from 'src/app/resolvers/countries.resolver';
import { OfficeDetailService } from './office-detail/office-detail.resolver';
import { AuthGuard } from 'src/app/core/services/auth-guard.service';
const routes: Routes = [
  {
    path: 'all',
    component: OfficeListComponent,
    canActivateChild: [AuthGuard], 
    resolve:{  
      countries: CountriesResolver
     
    }
  },
  {
    path: ':id',
    component: OfficeDetailComponent,
    canActivateChild: [AuthGuard], 
    resolve:{
      office: OfficeDetailService,
      countries: CountriesResolver  
    }
  },
  {
    path: '',
    component: OfficeDetailComponent,
    canActivateChild: [AuthGuard], 
    resolve:{      
      countries: CountriesResolver  
    }
  }
]


@NgModule({
  declarations: [OfficeDetailComponent, OfficeListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [OfficeDetailService, CountriesResolver]

})
export class OfficeModule { }
