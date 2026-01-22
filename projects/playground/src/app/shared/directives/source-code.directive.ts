import { Directive, ElementRef, Renderer2, inject } from '@angular/core'

@Directive({
  selector: '[playgroundSourceCode]',
})
export class SourceCodeDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly renderer = inject(Renderer2)

  constructor() {
    const html = this.el.nativeElement.outerHTML
    this.renderer.setAttribute(this.el.nativeElement, 'data-source', html)
  }
}
