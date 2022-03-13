import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentesCardComponent } from './antecedentes-card.component';

describe('AntecedentesAcademicosCardComponent', () => {
  let component: AntecedentesCardComponent;
  let fixture: ComponentFixture<AntecedentesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntecedentesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
