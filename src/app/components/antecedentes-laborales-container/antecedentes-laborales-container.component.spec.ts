import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentesLaboralesContainerComponent } from './antecedentes-laborales-container.component';

describe('AntecedentesLaboralesContainerComponent', () => {
  let component: AntecedentesLaboralesContainerComponent;
  let fixture: ComponentFixture<AntecedentesLaboralesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntecedentesLaboralesContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentesLaboralesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
