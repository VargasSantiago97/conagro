import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarDatosPDFComponent } from './importar-datos-pdf.component';

describe('ImportarDatosPDFComponent', () => {
  let component: ImportarDatosPDFComponent;
  let fixture: ComponentFixture<ImportarDatosPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportarDatosPDFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportarDatosPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
