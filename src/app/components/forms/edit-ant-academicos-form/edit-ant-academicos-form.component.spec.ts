import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAntAcademicosFormComponent } from './edit-ant-academicos-form.component';

describe('EditAntAcademicosFormComponent', () => {
  let component: EditAntAcademicosFormComponent;
  let fixture: ComponentFixture<EditAntAcademicosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAntAcademicosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAntAcademicosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
