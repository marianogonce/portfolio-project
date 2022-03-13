import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftskillsBadgeComponent } from './softskills-badge.component';

describe('SoftskillsBadgeComponent', () => {
  let component: SoftskillsBadgeComponent;
  let fixture: ComponentFixture<SoftskillsBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftskillsBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftskillsBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
