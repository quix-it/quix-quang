import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangInputNumberComponent } from './input-number.component'

describe('InputNumberComponent', () => {
  let component: QuangInputNumberComponent
  let fixture: ComponentFixture<QuangInputNumberComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangInputNumberComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangInputNumberComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
