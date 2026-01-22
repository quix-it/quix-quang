import { HttpClient } from '@angular/common/http'
import { Injectable, Type, inject } from '@angular/core'

import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'

// Add console logger for debugging purposes
const DEBUG = false
function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log('[ComponentDocService]', ...args)
  }
}

interface AngularCompiledMetadata {
  selectors?: unknown
  inputs?: Record<string, unknown>
  outputs?: Record<string, unknown>
}

interface AngularComponentType extends Type<unknown> {
  ɵcmp?: AngularCompiledMetadata
  propDecorators?: unknown
}

export interface PropertyDoc {
  name: string
  type: 'input' | 'output'
}

export interface ComponentDocumentation {
  inputs: PropertyDoc[]
  outputs: PropertyDoc[]
  selector: string
  readme?: string | null
}

@Injectable({
  providedIn: 'root',
})
export class ComponentDocumentationService {
  private readonly http = inject(HttpClient)

  /**
   * Extracts documentation for a component class
   * @param componentType The component class to document
   * @returns Documentation object with properties and selector
   */
  extractComponentDocumentation(componentType: Type<unknown>): ComponentDocumentation {
    debugLog(`Extracting documentation for component: ${componentType.name}`)

    // Get component metadata using reflection
    const angularComponent = componentType as AngularComponentType
    const componentMetadata = angularComponent.ɵcmp

    let selector = ''
    if (Array.isArray(componentMetadata?.selectors)) {
      const firstSelector = (componentMetadata.selectors as unknown[])[0]
      if (Array.isArray(firstSelector)) {
        selector = (firstSelector as unknown[])[0] as string
      }
    }
    debugLog(`Component selector: ${selector}`)

    // Extract input properties
    const inputs: PropertyDoc[] = []
    const outputs: PropertyDoc[] = []

    // METHOD 1: Access inputs through Angular's compiled metadata
    if (componentMetadata?.inputs) {
      debugLog('METHOD 1: Found Angular compiled metadata inputs:', componentMetadata.inputs)
      Object.entries(componentMetadata.inputs).forEach(([propName, inputMetadata]) => {
        // Each input metadata entry can have different formats based on Angular version
        let publicName = propName

        // Handle different metadata formats
        if (typeof inputMetadata === 'string') {
          // Simple mapping format: { publicName: 'privateName' }
          publicName = inputMetadata
        } else if (inputMetadata && typeof inputMetadata === 'object') {
          // More complex format with additional metadata
          publicName = (inputMetadata as { publicName?: string }).publicName || propName
        }

        // Check for Angular 17+ style input arrays [name, flags, defaultValue]
        if (Array.isArray(inputMetadata)) {
          publicName = (inputMetadata as unknown[])[0] as string
          if (!publicName) publicName = propName
        }

        inputs.push({
          name: publicName,
          type: 'input',
        })
      })
    }

    // METHOD 1 for outputs: Access outputs through Angular's compiled metadata
    if (componentMetadata?.outputs) {
      debugLog('METHOD 1: Found Angular compiled metadata outputs:', componentMetadata.outputs)
      Object.entries(componentMetadata.outputs).forEach(([propName, outputMetadata]) => {
        // Each output metadata entry can have different formats based on Angular version
        let publicName = propName

        // Handle different metadata formats
        if (typeof outputMetadata === 'string') {
          // Simple mapping format: { publicName: 'privateName' }
          publicName = outputMetadata
        } else if (outputMetadata && typeof outputMetadata === 'object') {
          // More complex format with additional metadata
          publicName = (outputMetadata as { publicName?: string }).publicName || propName
        }

        // Check for Angular 17+ style output arrays [name, flags]
        if (Array.isArray(outputMetadata)) {
          publicName = (outputMetadata as unknown[])[0] as string
          if (!publicName) publicName = propName
        }

        outputs.push({
          name: publicName,
          type: 'output',
        })
      })
    }

    // METHOD 2: Look for input signals (@Input decorators converted to input() functions)
    const prototype = componentType.prototype
    if (prototype) {
      // Get all property descriptors including from the prototype chain
      const propertyNames = Object.getOwnPropertyNames(prototype).filter((prop) => prop !== 'constructor')

      debugLog('METHOD 2: Looking for input signals in properties:', propertyNames)

      for (const propName of propertyNames) {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, propName)
        if (descriptor && typeof descriptor.value === 'function') {
          const fnString = descriptor.value.toString()
          debugLog(`Examining property ${propName}, function string:`, fnString)

          // Check if this is an input function
          if (
            fnString.includes('input(') ||
            fnString.includes('InputSignal') ||
            fnString.includes('model(') ||
            fnString.includes('ModelSignal')
          ) {
            debugLog(`Property ${propName} is an input signal`)

            inputs.push({
              name: propName,
              type: 'input',
            })
          }

          // Check if this is an output function
          if (fnString.includes('output(') || fnString.includes('OutputSignal') || fnString.includes('EventEmitter')) {
            debugLog(`Property ${propName} is an output signal`)

            outputs.push({
              name: propName,
              type: 'output',
            })
          }
        }
      }
    }

    // METHOD 3: Look for property decorators (older Angular versions)
    if (angularComponent.propDecorators && typeof angularComponent.propDecorators === 'object') {
      const propDecorators = angularComponent.propDecorators as Record<string, unknown>

      Object.keys(propDecorators).forEach((propName) => {
        const decorators = propDecorators[propName]
        if (!Array.isArray(decorators)) {
          return
        }

        // Check if one of the decorators is @Input
        const inputDecorator = (decorators as unknown[]).find((d) => {
          if (!d || typeof d !== 'object') return false
          const type = (d as { type?: unknown }).type
          if (!type || typeof type !== 'object') return false
          return (type as { name?: unknown }).name === 'Input'
        }) as { args?: unknown[] } | undefined
        if (inputDecorator) {
          const args = inputDecorator.args || []
          const publicName = (args[0] as string | undefined) || propName

          inputs.push({
            name: publicName,
            type: 'input',
          })
        }

        // Check if one of the decorators is @Output
        const outputDecorator = (decorators as unknown[]).find((d) => {
          if (!d || typeof d !== 'object') return false
          const type = (d as { type?: unknown }).type
          if (!type || typeof type !== 'object') return false
          return (type as { name?: unknown }).name === 'Output'
        }) as { args?: unknown[] } | undefined
        if (outputDecorator) {
          const args = outputDecorator.args || []
          const publicName = (args[0] as string | undefined) || propName

          outputs.push({
            name: publicName,
            type: 'output',
          })
        }
      })
    }

    // Deduplicate inputs by name
    const uniqueInputs: PropertyDoc[] = []
    const seenInputNames = new Set<string>()

    for (const prop of inputs) {
      if (!seenInputNames.has(prop.name)) {
        seenInputNames.add(prop.name)
        uniqueInputs.push(prop)
      }
    }

    // Deduplicate outputs by name
    const uniqueOutputs: PropertyDoc[] = []
    const seenOutputNames = new Set<string>()

    for (const prop of outputs) {
      if (!seenOutputNames.has(prop.name)) {
        seenOutputNames.add(prop.name)
        uniqueOutputs.push(prop)
      }
    }

    debugLog(`Final extracted inputs:`, uniqueInputs)
    debugLog(`Final extracted outputs:`, uniqueOutputs)

    return {
      inputs: uniqueInputs,
      outputs: uniqueOutputs,
      selector,
    }
  }

  /**
   * Fetches the README content for a component
   * @param componentType The component class to document
   * @param customReadmePath Optional custom path to the README file
   * @returns Observable with README content or null if not found
   */
  fetchReadmeContent(componentType: Type<unknown>, customReadmePath?: string): Observable<string | null> {
    debugLog(`Fetching README for component: ${componentType.name}`)

    // If a custom path is provided, try that first
    if (customReadmePath) {
      debugLog(`Trying custom README path: ${customReadmePath}`)
      return this.http.get(customReadmePath, { responseType: 'text' }).pipe(
        catchError((error) => {
          debugLog(`Error fetching from custom path:`, error)
          return of(null)
        })
      )
    }

    // Extract component name and try to determine the README path
    const componentName = componentType.name

    // Try to find the appropriate README path based on the component name
    // First, remove "Component" suffix if it exists
    const baseName = componentName.replace(/Component$/, '')

    // Convert from camelCase to kebab-case
    const kebabCase = baseName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

    // 1. Try paths in the component folders (how the project is structured)
    const projectPaths = [
      `/projects/quang/${kebabCase}/README.md`,
      `/projects/quang/components/${kebabCase}/README.md`,
      `/projects/quang/overlay/${kebabCase}/README.md`,
    ]

    // 2. Asset paths (current implementation)
    const assetPaths = [
      `/assets/readme/${kebabCase}.md`,
      `/assets/docs/${kebabCase}.md`,
      `/assets/documentation/${kebabCase}.md`,
    ]

    // Combine all possible paths
    const possiblePaths = [...projectPaths, ...assetPaths]
    debugLog(`Trying these possible README paths:`, possiblePaths)

    // Try each path in sequence
    return this.tryFetchFromPaths(possiblePaths)
  }

  /**
   * Tries to fetch content from multiple paths in sequence
   * @param paths Array of paths to try
   * @returns Observable with content or null if all paths fail
   */
  private tryFetchFromPaths(paths: string[]): Observable<string | null> {
    if (paths.length === 0) {
      return of(null)
    }

    const [current, ...remaining] = paths

    return this.http.get(current, { responseType: 'text' }).pipe(
      catchError(() => {
        debugLog(`Failed to fetch from ${current}, trying next path`)
        return this.tryFetchFromPaths(remaining)
      })
    )
  }
}
