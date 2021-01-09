import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {
  public activeLang = 'es';
  formControl: FormControl;
  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.activeLang);
  }
  ngOnInit() {
    this.formControl = new FormControl()
    this.formControl.setValue('es')
  }
  public cambiarLenguaje(value) {
    this.activeLang = value;
    this.translate.use(this.activeLang);
  }
}