import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSoftskillFormComponent } from './edit-softskill-form.component';

describe('EditSoftskillFormComponent', () => {
  let component: EditSoftskillFormComponent;
  let fixture: ComponentFixture<EditSoftskillFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSoftskillFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSoftskillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
