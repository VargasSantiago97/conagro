import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorredoresComponent } from './corredores.component';

describe('CorredoresComponent', () => {
  let component: CorredoresComponent;
  let fixture: ComponentFixture<CorredoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorredoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorredoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
