import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { MultiSelectObjComponent } from './multi-select-obj.component'

describe('MultiSelectObjComponent', () => {
  let component: MultiSelectObjComponent
  let fixture: ComponentFixture<MultiSelectObjComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiSelectObjComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectObjComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
