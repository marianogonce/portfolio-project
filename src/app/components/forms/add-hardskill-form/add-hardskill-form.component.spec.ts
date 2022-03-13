import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHardskillFormComponent } from './add-hardskill-form.component';

describe('AddHardskillFormComponent', () => {
  let component: AddHardskillFormComponent;
  let fixture: ComponentFixture<AddHardskillFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHardskillFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHardskillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
