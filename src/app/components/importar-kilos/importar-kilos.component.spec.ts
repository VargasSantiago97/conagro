import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarKilosComponent } from './importar-kilos.component';

describe('ImportarKilosComponent', () => {
  let component: ImportarKilosComponent;
  let fixture: ComponentFixture<ImportarKilosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportarKilosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportarKilosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
