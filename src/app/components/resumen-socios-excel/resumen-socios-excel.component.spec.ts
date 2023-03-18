import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenSociosExcelComponent } from './resumen-socios-excel.component';

describe('ResumenSociosExcelComponent', () => {
  let component: ResumenSociosExcelComponent;
  let fixture: ComponentFixture<ResumenSociosExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenSociosExcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenSociosExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
