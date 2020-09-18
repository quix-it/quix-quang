import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuixCardComponent } from './quix-card.component';

describe('QuixCardComponent', () => {
  let component: QuixCardComponent;
  let fixture: ComponentFixture<QuixCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuixCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuixCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
