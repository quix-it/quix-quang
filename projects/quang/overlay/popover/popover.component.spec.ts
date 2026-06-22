import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangPopoverComponent } from './popover.component'

describe('QuangPopoverComponent', () => {
  let component: QuangPopoverComponent
  let fixture: ComponentFixture<QuangPopoverComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuangPopoverComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(QuangPopoverComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
