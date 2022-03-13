import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardskillCardComponent } from './hardskill-card.component';

describe('HardskillCardComponent', () => {
  let component: HardskillCardComponent;
  let fixture: ComponentFixture<HardskillCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardskillCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardskillCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
