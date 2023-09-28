import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangLoaderComponent } from './loader.component'

describe('LoaderComponent', () => {
  let component: QuangLoaderComponent
  let fixture: ComponentFixture<QuangLoaderComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangLoaderComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangLoaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
