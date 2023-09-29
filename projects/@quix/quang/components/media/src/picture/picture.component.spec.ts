import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { QuangPictureComponent } from './picture.component'

describe('PictureComponent', () => {
  let component: QuangPictureComponent
  let fixture: ComponentFixture<QuangPictureComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangPictureComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangPictureComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
