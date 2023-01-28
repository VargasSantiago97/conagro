import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosProduccionResumenComponent } from './movimientos-produccion-resumen.component';

describe('MovimientosProduccionResumenComponent', () => {
  let component: MovimientosProduccionResumenComponent;
  let fixture: ComponentFixture<MovimientosProduccionResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientosProduccionResumenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientosProduccionResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
