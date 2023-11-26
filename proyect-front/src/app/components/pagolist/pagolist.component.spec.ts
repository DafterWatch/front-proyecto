import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagolistComponent } from './pagolist.component';

describe('PagolistComponent', () => {
  let component: PagolistComponent;
  let fixture: ComponentFixture<PagolistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagolistComponent]
    });
    fixture = TestBed.createComponent(PagolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
