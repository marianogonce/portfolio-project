import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAntLaboralFormComponent } from './update-ant-laboral-form.component';

describe('UpdateAntLaboralFormComponent', () => {
  let component: UpdateAntLaboralFormComponent;
  let fixture: ComponentFixture<UpdateAntLaboralFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAntLaboralFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAntLaboralFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
