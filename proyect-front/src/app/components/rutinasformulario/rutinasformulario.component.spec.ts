import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinasformularioComponent } from './rutinasformulario.component';

describe('RutinasformularioComponent', () => {
  let component: RutinasformularioComponent;
  let fixture: ComponentFixture<RutinasformularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RutinasformularioComponent]
    });
    fixture = TestBed.createComponent(RutinasformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
