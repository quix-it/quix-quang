import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomIconsComponent } from './custom-icons.component';

describe('CustomIconsComponent', () => {
  let component: CustomIconsComponent;
  let fixture: ComponentFixture<CustomIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
