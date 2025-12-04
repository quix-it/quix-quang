import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangLoaderComponent } from './loader.component'

describe('QuangLoaderComponent', () => {
  let component: QuangLoaderComponent
  let fixture: ComponentFixture<QuangLoaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuangLoaderComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(QuangLoaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
