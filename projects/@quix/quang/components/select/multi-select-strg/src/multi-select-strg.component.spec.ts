import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { MultiSelectStrgComponent } from './multi-select-strg.component'

describe('MultiSelectStrgComponent', () => {
  let component: MultiSelectStrgComponent
  let fixture: ComponentFixture<MultiSelectStrgComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiSelectStrgComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectStrgComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
