import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangInputCheckboxComponent } from './input-checkbox.component'

describe('InputCheckboxComponent', () => {
  let component: QuangInputCheckboxComponent
  let fixture: ComponentFixture<QuangInputCheckboxComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangInputCheckboxComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangInputCheckboxComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
