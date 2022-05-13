import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAntAcademicosFormComponent } from './add-ant-academicos-form.component';

describe('AddAntAcademicosFormComponent', () => {
  let component: AddAntAcademicosFormComponent;
  let fixture: ComponentFixture<AddAntAcademicosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAntAcademicosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAntAcademicosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
