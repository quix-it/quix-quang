import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangInputFractionComponent } from './input-fraction.component'

describe('InputFractionComponent', () => {
  let component: QuangInputFractionComponent
  let fixture: ComponentFixture<QuangInputFractionComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangInputFractionComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangInputFractionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
