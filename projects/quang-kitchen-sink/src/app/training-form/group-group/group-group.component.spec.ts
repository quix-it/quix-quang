import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GroupGroupComponent } from './group-group.component'

describe('GroupGroupComponent', () => {
  let component: GroupGroupComponent
  let fixture: ComponentFixture<GroupGroupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupGroupComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupGroupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
