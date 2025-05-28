import { Directive, ElementRef, Renderer2 } from '@angular/core'

@Directive({
  selector: '[playgroundSourceCode]'
})
export class SourceCodeDirective{

  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) { // Get the outerHTML of the element before Angular processes it
    const html = this.el.nativeElement.outerHTML;

    // Store the raw HTML as a data attribute
    this.renderer.setAttribute(this.el.nativeElement, 'data-source', html);
  }

}
