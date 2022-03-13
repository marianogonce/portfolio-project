import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaContainerComponent } from './social-media-container.component';

describe('SocialMediaContainerComponent', () => {
  let component: SocialMediaContainerComponent;
  let fixture: ComponentFixture<SocialMediaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
