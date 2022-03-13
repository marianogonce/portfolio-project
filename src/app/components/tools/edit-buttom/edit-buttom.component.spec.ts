import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditButtomComponent } from './edit-buttom.component';

describe('EditButtomComponent', () => {
  let component: EditButtomComponent;
  let fixture: ComponentFixture<EditButtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditButtomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditButtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
