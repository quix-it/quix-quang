import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangTextAreaComponent } from './text-area.component'

describe('TextAreaComponent', () => {
  let component: QuangTextAreaComponent
  let fixture: ComponentFixture<QuangTextAreaComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangTextAreaComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangTextAreaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
