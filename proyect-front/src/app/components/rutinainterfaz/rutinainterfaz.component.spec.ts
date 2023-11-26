import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinainterfazComponent } from './rutinainterfaz.component';

describe('RutinainterfazComponent', () => {
  let component: RutinainterfazComponent;
  let fixture: ComponentFixture<RutinainterfazComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RutinainterfazComponent]
    });
    fixture = TestBed.createComponent(RutinainterfazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
