import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDateTimeComponent } from './input-date-time.component';

describe('InputDateTimeComponent', () => {
  let component: InputDateTimeComponent;
  let fixture: ComponentFixture<InputDateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDateTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
