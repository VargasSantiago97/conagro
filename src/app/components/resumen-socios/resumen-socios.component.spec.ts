import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenSociosComponent } from './resumen-socios.component';

describe('ResumenSociosComponent', () => {
  let component: ResumenSociosComponent;
  let fixture: ComponentFixture<ResumenSociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenSociosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
