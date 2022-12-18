import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRegistrosComponent } from './crear-registros.component';

describe('CrearRegistrosComponent', () => {
  let component: CrearRegistrosComponent;
  let fixture: ComponentFixture<CrearRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearRegistrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
