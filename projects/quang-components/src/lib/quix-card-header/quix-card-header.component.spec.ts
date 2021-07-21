import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuixCardHeaderComponent } from './quix-card-header.component';

describe('QuixCardHeaderComponent', () => {
  let component: QuixCardHeaderComponent;
  let fixture: ComponentFixture<QuixCardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuixCardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuixCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
