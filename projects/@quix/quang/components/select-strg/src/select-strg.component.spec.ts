import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SelectStrgComponent } from './select-strg.component'

describe('SelectStrgComponent', () => {
  let component: SelectStrgComponent
  let fixture: ComponentFixture<SelectStrgComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectStrgComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStrgComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
