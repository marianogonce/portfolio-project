import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardskillContainerComponent } from './hardskill-container.component';

describe('HardskillContainerComponent', () => {
  let component: HardskillContainerComponent;
  let fixture: ComponentFixture<HardskillContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardskillContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardskillContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
