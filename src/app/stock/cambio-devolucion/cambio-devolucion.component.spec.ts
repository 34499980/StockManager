import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioDevolucionComponent } from './cambio-devolucion.component';

describe('CambioDevolucionComponent', () => {
  let component: CambioDevolucionComponent;
  let fixture: ComponentFixture<CambioDevolucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioDevolucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
