import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GroupArrayComponent } from './group-array.component'

describe('GroupArrayComponent', () => {
  let component: GroupArrayComponent
  let fixture: ComponentFixture<GroupArrayComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupArrayComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupArrayComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
