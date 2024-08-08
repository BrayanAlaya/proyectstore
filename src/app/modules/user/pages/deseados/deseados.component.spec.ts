import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeseadosComponent } from './deseados.component';

describe('DeseadosComponent', () => {
  let component: DeseadosComponent;
  let fixture: ComponentFixture<DeseadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeseadosComponent]
    });
    fixture = TestBed.createComponent(DeseadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
