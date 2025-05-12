// filepath: /Users/stefano.restuccia/Progetti/quix-quang/projects/playground/src/app/shared/components/component-documentation/component-documentation.component.ts
import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Type, computed, inject, input, signal } from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'
import { ReactiveFormsModule } from '@angular/forms'

import { TranslocoPipe } from '@jsverse/transloco'

import { ComponentDocumentation, ComponentDocumentationService } from '../../services/component-documentation.service'

@Component({
  selector: 'playground-component-documentation',
  standalone: true,
  imports: [CommonModule, TranslocoPipe, ReactiveFormsModule],
  templateUrl: './component-documentation.component.html',
  styleUrl: './component-documentation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentDocumentationComponent {
  componentType = input.required<Type<any>>()
  exampleHtml = input<string>('')

  cleanedExampleHtml = computed(() =>
    this.exampleHtml()
      .replace(/id=".*? "/g, '')
      .replace(/playgroundsourcecode=".*? "/g, '')
      .replace(/_nghost-ng-c\d+=""( )?/g, '')
      .replace(/ng-reflect-[a-zA-Z-]+="[^"]*"( )?/g, '')
      .replace(/_ng[a-zA-Z-]+="[^"]*"( )?/g, '')
      .replaceAll(' ', '\n')
  )

  documentation = signal<ComponentDocumentation | null>(null)

  documentationService = inject(ComponentDocumentationService)

  componentType$ = toObservable(this.componentType).subscribe((type) => {
    // Extract documentation for the component
    this.documentation.set(this.documentationService.extractComponentDocumentation(type))
    console.log('doc -->', this.documentation())
  })
}
