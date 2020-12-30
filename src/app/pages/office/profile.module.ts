import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { OfficeListComponent } from './office-list/office-list.component';
import { OfficeDetailComponent } from './office-detail/office-detail.component';
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
  providers: []

})
export class OfficeModule { }
