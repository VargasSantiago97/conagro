import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerxlsxComponent } from './verxlsx.component';

describe('VerxlsxComponent', () => {
  let component: VerxlsxComponent;
  let fixture: ComponentFixture<VerxlsxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerxlsxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerxlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
