import { ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangSkeletonComponent } from './skeleton.component'

describe('SkeletonComponent', () => {
  let component: QuangSkeletonComponent
  let fixture: ComponentFixture<QuangSkeletonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuangSkeletonComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangSkeletonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
