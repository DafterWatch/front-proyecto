import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioformularioComponent } from './usuarioformulario.component';

describe('UsuarioformularioComponent', () => {
  let component: UsuarioformularioComponent;
  let fixture: ComponentFixture<UsuarioformularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioformularioComponent]
    });
    fixture = TestBed.createComponent(UsuarioformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
