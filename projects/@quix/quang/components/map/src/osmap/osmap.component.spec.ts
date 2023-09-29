import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { OSMapComponent } from './osmap.component'

describe('OSMapComponent', () => {
  let component: OSMapComponent
  let fixture: ComponentFixture<OSMapComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OSMapComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(OSMapComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
