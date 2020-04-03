import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularcionesComponent } from './anularciones.component';

describe('AnularcionesComponent', () => {
  let component: AnularcionesComponent;
  let fixture: ComponentFixture<AnularcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnularcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
