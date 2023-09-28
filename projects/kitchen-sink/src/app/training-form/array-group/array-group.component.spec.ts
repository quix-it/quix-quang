import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ArrayGroupComponent } from './array-group.component'

describe('ArrayGroupComponent', () => {
  let component: ArrayGroupComponent
  let fixture: ComponentFixture<ArrayGroupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArrayGroupComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayGroupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
