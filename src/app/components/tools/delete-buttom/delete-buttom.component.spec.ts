import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteButtomComponent } from './delete-buttom.component';

describe('DeleteButtomComponent', () => {
  let component: DeleteButtomComponent;
  let fixture: ComponentFixture<DeleteButtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteButtomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteButtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
