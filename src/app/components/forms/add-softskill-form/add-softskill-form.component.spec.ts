import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoftskillFormComponent } from './add-softskill-form.component';

describe('AddSoftskillFormComponent', () => {
  let component: AddSoftskillFormComponent;
  let fixture: ComponentFixture<AddSoftskillFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSoftskillFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSoftskillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
