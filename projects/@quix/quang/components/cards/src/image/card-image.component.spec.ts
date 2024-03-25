import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangCardImageComponent } from './card-image.component'

describe('CardImageComponent', () => {
  let component: QuangCardImageComponent
  let fixture: ComponentFixture<QuangCardImageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuangCardImageComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangCardImageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
