import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosProduccionComponent } from './movimientos-produccion.component';

describe('MovimientosProduccionComponent', () => {
  let component: MovimientosProduccionComponent;
  let fixture: ComponentFixture<MovimientosProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientosProduccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientosProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
