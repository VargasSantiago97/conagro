import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerListadoCPComponent } from './ver-listado-cp.component';

describe('VerListadoCPComponent', () => {
  let component: VerListadoCPComponent;
  let fixture: ComponentFixture<VerListadoCPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerListadoCPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerListadoCPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
