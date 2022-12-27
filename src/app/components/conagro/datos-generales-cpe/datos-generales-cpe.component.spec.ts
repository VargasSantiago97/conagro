import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralesCPEComponent } from './datos-generales-cpe.component';

describe('DatosGeneralesCPEComponent', () => {
  let component: DatosGeneralesCPEComponent;
  let fixture: ComponentFixture<DatosGeneralesCPEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosGeneralesCPEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesCPEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
