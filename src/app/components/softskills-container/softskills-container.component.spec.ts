import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftskillsContainerComponent } from './softskills-container.component';

describe('SoftskillsContainerComponent', () => {
  let component: SoftskillsContainerComponent;
  let fixture: ComponentFixture<SoftskillsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftskillsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftskillsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
