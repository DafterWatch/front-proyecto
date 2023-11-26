import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioformularioComponent } from './servicioformulario.component';

describe('ServicioformularioComponent', () => {
  let component: ServicioformularioComponent;
  let fixture: ComponentFixture<ServicioformularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicioformularioComponent]
    });
    fixture = TestBed.createComponent(ServicioformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
