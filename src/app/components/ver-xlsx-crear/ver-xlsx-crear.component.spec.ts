import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerXlsxCrearComponent } from './ver-xlsx-crear.component';

describe('VerXlsxCrearComponent', () => {
  let component: VerXlsxCrearComponent;
  let fixture: ComponentFixture<VerXlsxCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerXlsxCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerXlsxCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
