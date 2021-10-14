import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuixCardImageComponent } from './quix-card-image.component';

describe('QuixCardImageComponent', () => {
  let component: QuixCardImageComponent;
  let fixture: ComponentFixture<QuixCardImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuixCardImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuixCardImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
