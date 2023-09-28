import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { QuangPaginatorComponent } from './paginator.component'

describe('PaginatorComponent', () => {
  let component: QuangPaginatorComponent
  let fixture: ComponentFixture<QuangPaginatorComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuangPaginatorComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuangPaginatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
