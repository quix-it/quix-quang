import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DeviceMotionComponent } from './device-motion.component'

describe('DeviceMotionComponent', () => {
  let component: DeviceMotionComponent
  let fixture: ComponentFixture<DeviceMotionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceMotionComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMotionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
