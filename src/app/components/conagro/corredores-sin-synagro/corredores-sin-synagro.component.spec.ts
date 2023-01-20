import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorredoresSinSynagroComponent } from './corredores-sin-synagro.component';

describe('CorredoresSinSynagroComponent', () => {
  let component: CorredoresSinSynagroComponent;
  let fixture: ComponentFixture<CorredoresSinSynagroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorredoresSinSynagroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorredoresSinSynagroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
