import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFleterosComponent } from './lista-fleteros.component';

describe('ListaFleterosComponent', () => {
  let component: ListaFleterosComponent;
  let fixture: ComponentFixture<ListaFleterosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFleterosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFleterosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
