import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ArrayArrayComponent } from './array-array.component'

describe('ArrayArrayComponent', () => {
  let component: ArrayArrayComponent
  let fixture: ComponentFixture<ArrayArrayComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArrayArrayComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayArrayComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
