import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { SharedModule } from '../shared/shared.module';
import { SidenavComponent } from './sidenav/sidenav.component';

const COMPONENTS = [
    SidenavComponent
];
@NgModule({
    imports: [
      RouterModule,
      SharedModule

  ],
  exports: [
    ...COMPONENTS
  ],
   declarations: [
    ...COMPONENTS
  ]
})
export class CoreModule { }
