import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarDescargasComponent } from './cargar-descargas.component';

describe('CargarDescargasComponent', () => {
  let component: CargarDescargasComponent;
  let fixture: ComponentFixture<CargarDescargasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarDescargasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarDescargasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
