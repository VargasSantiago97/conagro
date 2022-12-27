import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarListadoCPComponent } from './actualizar-listado-cp.component';

describe('ActualizarListadoCPComponent', () => {
  let component: ActualizarListadoCPComponent;
  let fixture: ComponentFixture<ActualizarListadoCPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarListadoCPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarListadoCPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
