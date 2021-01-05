import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountriesResolver } from 'src/app/resolvers/countries.resolver';
import { StockListComponent } from './stock-list/stock-list.component';
const routes: Routes = [
  {
    path: '',
    component: StockListComponent,
    resolve:{      
      countries: CountriesResolver  
    }
  }
]


@NgModule({
  declarations: [StockListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [CountriesResolver]

})
export class StockModule { }
