import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountriesResolver } from 'src/app/resolvers/countries.resolver';
import { OfficeResolver } from 'src/app/resolvers/office.resolver';
import { HistoryListComponent } from './history-list.component';
const routes: Routes = [
  {
    path: '',
    component: HistoryListComponent,
    resolve:{      
      countries: CountriesResolver,
      offices: OfficeResolver  
    }
  }
]


@NgModule({
  declarations: [HistoryListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [CountriesResolver, OfficeResolver]

})
export class HistoryModule { }
