// filepath: /Users/stefano.restuccia/Progetti/quix-quang/projects/playground/src/app/shared/services/component-documentation.service.ts
import { Injectable, Type } from '@angular/core'

// Add console logger for debugging purposes
const DEBUG = true
function debugLog(...args: any[]) {
  if (DEBUG) {
    console.log('[ComponentDocService]', ...args)
  }
}

export interface PropertyDoc {
  name: string
}

export interface ComponentDocumentation {
  properties: PropertyDoc[]
  selector: string
}

@Injectable({
  providedIn: 'root',
})
export class ComponentDocumentationService {
  /**
   * Extracts documentation for a component class
   * @param componentType The component class to document
   * @returns Documentation object with properties and selector
   */
  extractComponentDocumentation(componentType: Type<any>): ComponentDocumentation {
    debugLog(`Extracting documentation for component: ${componentType.name}`)

    // Get component metadata using reflection
    const componentMetadata = (componentType as any).ɵcmp
    const selector = componentMetadata?.selectors?.[0]?.[0] || ''
    debugLog(`Component selector: ${selector}`)

    // Extract input properties
    const properties: PropertyDoc[] = []

    // METHOD 1: Access inputs through Angular's compiled metadata
    if (componentMetadata?.inputs) {
      debugLog('METHOD 1: Found Angular compiled metadata inputs:', componentMetadata.inputs)
      Object.entries(componentMetadata.inputs).forEach(([propName, inputMetadata]: [string, any]) => {
        // Each input metadata entry can have different formats based on Angular version
        let publicName = propName

        console.log('inputMetadata', inputMetadata)

        // Handle different metadata formats
        if (typeof inputMetadata === 'string') {
          // Simple mapping format: { publicName: 'privateName' }
          publicName = inputMetadata
        } else if (inputMetadata && typeof inputMetadata === 'object') {
          // More complex format with additional metadata
          publicName = inputMetadata.publicName || propName
        }

        // Check for Angular 17+ style input arrays [name, flags, defaultValue]
        if (Array.isArray(inputMetadata)) {
          publicName = inputMetadata[0] || propName
        }

        properties.push({
          name: publicName,
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

            properties.push({
              name: propName,
            })
          }
        }
      }
    }

    // METHOD 3: Look for property decorators (older Angular versions)
    if ((componentType as any).propDecorators) {
      const propDecorators = (componentType as any).propDecorators

      Object.keys(propDecorators).forEach((propName) => {
        const decorators = propDecorators[propName]

        // Check if one of the decorators is @Input
        const inputDecorator = decorators.find((d: any) => d.type.name === 'Input')
        if (inputDecorator) {
          const args = inputDecorator.args || []
          const publicName = args[0] || propName

          properties.push({
            name: publicName,
          })
        }
      })
    }

    // Deduplicate properties by name (in case we found the same property through multiple methods)
    const uniqueProperties: PropertyDoc[] = []
    const seenNames = new Set<string>()

    for (const prop of properties) {
      if (!seenNames.has(prop.name)) {
        seenNames.add(prop.name)
        uniqueProperties.push(prop)
      }
    }

    debugLog(`Final extracted properties:`, uniqueProperties)

    return {
      properties: uniqueProperties,
      selector,
    }
  }
}
