import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangInputColorComponent } from './input-color.component'

describe('InputColorComponent', () => {
  let component: QuangInputColorComponent
  let fixture: ComponentFixture<QuangInputColorComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangInputColorComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangInputColorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
