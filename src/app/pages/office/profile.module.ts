import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OfficeListComponent } from './office-list/office-list.component';
import { OfficeDetailComponent } from './office-detail/office-detail.component';
import { OfficeResolver } from 'src/app/resolvers/office.resolver';
const routes: Routes = [
  {
    path: 'all',
    component: OfficeListComponent,
    resolve:{  
    
     
    }
  },
  {
    path: ':id',
    component: OfficeDetailComponent,
    resolve:{
      office: OfficeResolver   
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
  providers: [OfficeResolver]

})
export class OfficeModule { }
