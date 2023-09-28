import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AsyncValidatorComponent } from './async-validator.component'

describe('AsyncValidatorComponent', () => {
  let component: AsyncValidatorComponent
  let fixture: ComponentFixture<AsyncValidatorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsyncValidatorComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncValidatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
