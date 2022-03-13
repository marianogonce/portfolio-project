import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentesAcademicosContainerComponent } from './antecedentes-academicos-container.component';

describe('AntecedentesAcademicosContainerComponent', () => {
  let component: AntecedentesAcademicosContainerComponent;
  let fixture: ComponentFixture<AntecedentesAcademicosContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntecedentesAcademicosContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentesAcademicosContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
