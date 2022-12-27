import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLoteActividadComponent } from './lista-lote-actividad.component';

describe('ListaLoteActividadComponent', () => {
  let component: ListaLoteActividadComponent;
  let fixture: ComponentFixture<ListaLoteActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaLoteActividadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaLoteActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
