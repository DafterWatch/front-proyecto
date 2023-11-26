import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasformularioComponent } from './noticiasformulario.component';

describe('NoticiasformularioComponent', () => {
  let component: NoticiasformularioComponent;
  let fixture: ComponentFixture<NoticiasformularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticiasformularioComponent]
    });
    fixture = TestBed.createComponent(NoticiasformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
