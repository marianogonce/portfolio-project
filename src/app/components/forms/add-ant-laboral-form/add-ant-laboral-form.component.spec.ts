import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAntLaboralFormComponent } from './add-ant-laboral-form.component';

describe('AddAntLaboralFormComponent', () => {
  let component: AddAntLaboralFormComponent;
  let fixture: ComponentFixture<AddAntLaboralFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAntLaboralFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAntLaboralFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
