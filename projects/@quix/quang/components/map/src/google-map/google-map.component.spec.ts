import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangGoogleMapComponent } from './google-map.component'

describe('GoogleMapComponent', () => {
  let component: QuangGoogleMapComponent
  let fixture: ComponentFixture<QuangGoogleMapComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangGoogleMapComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangGoogleMapComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
