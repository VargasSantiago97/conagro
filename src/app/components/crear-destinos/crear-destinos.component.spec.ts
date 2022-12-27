import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDestinosComponent } from './crear-destinos.component';

describe('CrearDestinosComponent', () => {
  let component: CrearDestinosComponent;
  let fixture: ComponentFixture<CrearDestinosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearDestinosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDestinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
