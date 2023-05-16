import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SelectObjComponent } from './select-obj.component'

describe('SelectObjComponent', () => {
  let component: SelectObjComponent
  let fixture: ComponentFixture<SelectObjComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectObjComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectObjComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
