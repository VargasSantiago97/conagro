import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCambiosComponent } from './ver-cambios.component';

describe('VerCambiosComponent', () => {
  let component: VerCambiosComponent;
  let fixture: ComponentFixture<VerCambiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCambiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCambiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
