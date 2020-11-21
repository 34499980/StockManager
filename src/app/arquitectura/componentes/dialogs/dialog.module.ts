import {NgModule} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DialogconfirmComponent } from './dialogconfirm/dialogconfirm.component';
import { DialogMessageComponent } from './dialogMessage/dialogMessage.component';
import { ModaldetailsComponent } from './modaldetails/modaldetails.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports:[
        SharedModule
    ],
    declarations: [
        DialogconfirmComponent,
        DialogMessageComponent,
        ModaldetailsComponent
    ],
    providers: [

    ]
})
export class DialogModule {
}