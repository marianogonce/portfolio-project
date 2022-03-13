import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHardskillFormComponent } from './update-hardskill-form.component';

describe('UpdateHardskillFormComponent', () => {
  let component: UpdateHardskillFormComponent;
  let fixture: ComponentFixture<UpdateHardskillFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateHardskillFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHardskillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
