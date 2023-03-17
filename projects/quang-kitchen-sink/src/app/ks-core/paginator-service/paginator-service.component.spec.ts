import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PaginatorServiceComponent } from './paginator-service.component'

describe('PaginatorServiceComponent', () => {
  let component: PaginatorServiceComponent
  let fixture: ComponentFixture<PaginatorServiceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorServiceComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorServiceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
