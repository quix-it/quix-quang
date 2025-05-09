// filepath: /Users/stefano.restuccia/Progetti/quix-quang/projects/playground/src/app/shared/services/component-documentation.service.ts
import { Injectable, Type } from '@angular/core'

// Add console logger for debugging purposes
const DEBUG = true;
function debugLog(...args: any[]) {
  if (DEBUG) {
    console.log('[ComponentDocService]', ...args);
  }
}

export interface PropertyDoc {
  name: string
  type: string
  required: boolean
  description?: string
  defaultValue?: string
}

export interface ComponentDocumentation {
  properties: PropertyDoc[]
  selector: string
}

@Injectable({
  providedIn: 'root'
})
export class ComponentDocumentationService {
  /**
   * Extracts documentation for a component class
   * @param componentType The component class to document
   * @returns Documentation object with properties and selector
   */
  extractComponentDocumentation(componentType: Type<any>): ComponentDocumentation {
    // debugLog(`Extracting documentation for component: ${componentType.name}`);

    // Get component metadata using reflection
    const componentMetadata = (componentType as any).ɵcmp;
    const selector = componentMetadata?.selectors?.[0]?.[0] || '';
    // debugLog(`Component selector: ${selector}`);

    // Extract JSDoc comments for properties
    const commentsMap = this.extractJSDocComments(componentType);
    // debugLog('Extracted JSDoc comments:', commentsMap);

    // Extract input properties
    const properties: PropertyDoc[] = [];

    // METHOD 1: Access inputs through Angular's compiled metadata
    if (componentMetadata?.inputs) {
      // debugLog('METHOD 1: Found Angular compiled metadata inputs:', componentMetadata.inputs);
      Object.entries(componentMetadata.inputs).forEach(([propName, inputMetadata]: [string, any]) => {
        // Each input metadata entry can have different formats based on Angular version
        let publicName = propName;
        let isRequired = false;
        let defaultValue: string | undefined = undefined;
        let type: string = 'any';

        // Handle different metadata formats
        if (typeof inputMetadata === 'string') {
          // Simple mapping format: { publicName: 'privateName' }
          publicName = inputMetadata;
        } else if (inputMetadata && typeof inputMetadata === 'object') {
          // More complex format with additional metadata
          publicName = inputMetadata.publicName || propName;
          if (inputMetadata.hasOwnProperty('required')) {
            isRequired = !!inputMetadata.required;
          }
          if (inputMetadata.hasOwnProperty('default')) {
            defaultValue = String(inputMetadata.default);
          }

          // Angular v17 signals store type information in _typeId property
          if (inputMetadata._typeId) {
            // debugLog(`Found _typeId for ${publicName}: ${inputMetadata._typeId}`);
            // Extract the type name from the _typeId
            type = this.extractTypeFromTypeId(inputMetadata._typeId, propName);
          }
        }

        // Check for Angular 17+ style input arrays [name, flags, defaultValue]
        if (Array.isArray(inputMetadata)) {
          publicName = inputMetadata[0] || propName;
          const flag = inputMetadata[1];
          // Flag 3 indicates required input, Flag 1 indicates regular input
          isRequired = flag === 3;

          // Attempt to get default value (if present)
          if (inputMetadata.length > 2 && inputMetadata[2] !== null && inputMetadata[2] !== undefined) {
            defaultValue = String(inputMetadata[2]);
          }

          // Directly examine the Input signal definitions from the component source
          this.extractInputSignalTypes(componentType, propName, (extractedType, extractedDefault, extractedRequired) => {
            if (extractedType) type = extractedType;
            if (extractedDefault !== undefined) defaultValue = extractedDefault;
            if (extractedRequired !== undefined) isRequired = extractedRequired;
          });
        }

        // Try to infer the type if we haven't found it yet
        if (type === 'any') {
          type = this.inferTypeFromName(publicName);
        }

        // For Signal inputs in Angular 17+, check for required inputs
        if (Array.isArray(inputMetadata) && inputMetadata.length > 1) {
          // In Angular 17+ metadata, some info is stored as array [name, flags, defaultValue]
          // Flag 1 is for input(), Flag 3 is for input.required()
          const flag = inputMetadata[1];
          isRequired = flag === 3 || isRequired;

          // Try to get the real type if possible by introspecting the component class
          if (componentType.prototype && propName in componentType.prototype) {
            const propertyDescriptor = Object.getOwnPropertyDescriptor(componentType.prototype, propName);
            if (propertyDescriptor?.value?.toString) {
              const fnString = propertyDescriptor.value.toString();
              // debugLog(`Examining Signal property ${propName} from prototype:`, fnString);

              // Try to extract type info from the signal's generic type
              if (fnString.includes('input<') || fnString.includes('input.required<')) {
                type = this.inferTypeFromInputFunction(fnString);
                // debugLog(`Inferred type for ${propName} from signal: ${type}`);
              }
            }
          }
        }

        // Add description from JSDoc comments if available
        const description = commentsMap.get(propName) || undefined;

        properties.push({
          name: publicName,
          type,
          required: isRequired,
          defaultValue,
          description
        });
      });
    }

    // METHOD 2: Look for input signals (@Input decorators converted to input() functions)
    const prototype = componentType.prototype;
    if (prototype) {
      // Get all property descriptors including from the prototype chain
      const propertyNames = Object.getOwnPropertyNames(prototype)
        .filter(prop => prop !== 'constructor');

      // debugLog('METHOD 2: Looking for input signals in properties:', propertyNames);

      for (const propName of propertyNames) {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, propName);
        if (descriptor && typeof descriptor.value === 'function') {
          const fnString = descriptor.value.toString();
          // debugLog(`Examining property ${propName}, function string:`, fnString);

          // Check if this is an input function
          if (fnString.includes('input(') || fnString.includes('InputSignal') ||
              fnString.includes('model(') || fnString.includes('ModelSignal')) {
            // debugLog(`Property ${propName} is an input signal`);

            const isRequired = fnString.includes('required:') && fnString.includes('true');
            let defaultValue: string | undefined = undefined;
            let type: string = 'any';

            // Try to extract type information
            // Look for explicit type in the input configuration
            const typeMatch = fnString.match(/type\s*:\s*['"]([^'"]+)['"]/);
            if (typeMatch && typeMatch[1]) {
              type = typeMatch[1];
              // debugLog(`Found explicit type via type: property: ${type}`);
            }

            // Try to extract default value from the input function
            // This improved regex looks for the first argument to input() or model()
            const defaultMatch = fnString.match(/(?:input|model)\s*\(\s*(?:(?:['"](.+?)['"])|([^,{)]+))/);
            if (defaultMatch) {
              // Either group 1 (quoted) or group 2 (unquoted) will have the value
              defaultValue = defaultMatch[1] || defaultMatch[2];
              if (defaultValue) {
                defaultValue = defaultValue.trim();
                // Clean up quotes if present
                if ((defaultValue.startsWith("'") && defaultValue.endsWith("'")) ||
                    (defaultValue.startsWith('"') && defaultValue.endsWith('"'))) {
                  defaultValue = defaultValue.substring(1, defaultValue.length - 1);
                }
                // debugLog(`Found default value: ${defaultValue}`);
              }
            }

            // Check for transform functions which indicate type
            if (fnString.includes('numberAttribute') || fnString.includes('parseFloat')) {
              type = 'number';
              // debugLog(`Found number type via transform function`);
            } else if (fnString.includes('booleanAttribute')) {
              type = 'boolean';
              // debugLog(`Found boolean type via transform function`);
            } else if (type === 'any') {
              // If we couldn't determine the type from transforms, use our inference method
              // debugLog(`Using inferTypeFromInputFunction for ${propName}`);
              type = this.inferTypeFromInputFunction(fnString);
              // debugLog(`Inferred type from function: ${type}`);
            }

            // Add description from JSDoc comments if available
            const description = commentsMap.get(propName) || undefined;

            properties.push({
              name: propName,
              type: type,
              required: isRequired,
              defaultValue: defaultValue,
              description
            });

            // debugLog(`Added property: ${propName}, type: ${type}, required: ${isRequired}`);
          }
        }
      }
    }

    // METHOD 3: Look for property decorators (older Angular versions)
    if ((componentType as any).propDecorators) {
      const propDecorators = (componentType as any).propDecorators;

      Object.keys(propDecorators).forEach(propName => {
        const decorators = propDecorators[propName];

        // Check if one of the decorators is @Input
        const inputDecorator = decorators.find((d: any) => d.type.name === 'Input');
        if (inputDecorator) {
          const args = inputDecorator.args || [];
          const publicName = args[0] || propName;
          const isRequired = args.length > 1 && args[1].required === true;

          // Add description from JSDoc comments if available
          const description = commentsMap.get(propName) || undefined;

          properties.push({
            name: publicName,
            type: this.inferTypeFromName(propName),
            required: isRequired,
            defaultValue: undefined, // Not easily available from decorators
            description
          });
        }
      });
    }

    // Deduplicate properties by name (in case we found the same property through multiple methods)
    const uniqueProperties: PropertyDoc[] = [];
    const seenNames = new Set<string>();

    for (const prop of properties) {
      if (!seenNames.has(prop.name)) {
        seenNames.add(prop.name);
        uniqueProperties.push(prop);
      }
    }

    // debugLog(`Final extracted properties:`, uniqueProperties);

    return {
      properties: uniqueProperties,
      selector
    };
  }

  /**
   * Extract type information, default values and required status from signal inputs
   * @param componentType The component class to analyze
   * @param propName The property name to extract info for
   * @param callback Callback function that receives the extracted type, default value, and required status
   */
  private extractInputSignalTypes(
    componentType: Type<any>,
    propName: string,
    callback: (type: string | null, defaultValue: string | undefined, required: boolean | undefined) => void
  ): void {
    // debugLog(`Extracting signal input types for property: ${propName}`);

    try {
      // Access the property descriptor from the component's prototype
      const prototype = componentType.prototype;
      if (!prototype) {
        // debugLog(`No prototype found for component`);
        callback(null, undefined, undefined);
        return;
      }

      const descriptor = Object.getOwnPropertyDescriptor(prototype, propName);
      if (!descriptor || typeof descriptor.value !== 'function') {
        // debugLog(`No function descriptor found for property ${propName}`);
        callback(null, undefined, undefined);
        return;
      }

      // Get the function string representation to analyze
      const fnString = descriptor.value.toString();
      // debugLog(`Analyzing signal function for ${propName}:`, fnString);

      // Extract type information
      let type: string | null = null;
      let defaultValue: string | undefined = undefined;
      let required: boolean | undefined = undefined;

      // Check if it's a required input
      if (fnString.includes('input.required') || fnString.includes('required:true') ||
          fnString.includes('required: true')) {
        required = true;
        // debugLog(`${propName} is a required input`);
      } else if (fnString.includes('input(') || fnString.includes('input<')) {
        required = false;
        // debugLog(`${propName} is an optional input`);
      }

      // Extract type information from generics
      // Look for patterns like input<string>() or input.required<SomeType>()
      const genericTypeMatch = fnString.match(/input(?:\.required)?<([^>]+)>\(/);
      if (genericTypeMatch && genericTypeMatch[1]) {
        type = genericTypeMatch[1].trim();
        // debugLog(`Found generic type for ${propName}: ${type}`);
      }

      // If no generic type, look for type specified in options
      if (!type) {
        const typeOptionsMatch = fnString.match(/type\s*:\s*['"]([^'"]+)['"]/);
        if (typeOptionsMatch && typeOptionsMatch[1]) {
          type = typeOptionsMatch[1].trim();
          // debugLog(`Found type in options for ${propName}: ${type}`);
        }
      }

      // Look for transform functions which indicate type
      if (!type) {
        if (fnString.includes('numberAttribute') || fnString.includes('parseFloat')) {
          type = 'number';
          // debugLog(`Inferred number type from transforms for ${propName}`);
        } else if (fnString.includes('booleanAttribute')) {
          type = 'boolean';
          // debugLog(`Inferred boolean type from transforms for ${propName}`);
        }
      }

      // Extract default value
      // First check for explicit default in the first argument of input()
      const defaultMatch = fnString.match(/(?:input|model)(?:\.required)?\s*\(\s*(?:(?:['"](.+?)['"])|(?:{[^}]*})|([^,{)]+))/);
      if (defaultMatch) {
        // Either group 1 (quoted) or group 2 (unquoted) will have the value
        defaultValue = defaultMatch[1] || defaultMatch[2];
        if (defaultValue) {
          defaultValue = defaultValue.trim();
          // Clean up quotes if present
          if ((defaultValue.startsWith("'") && defaultValue.endsWith("'")) ||
              (defaultValue.startsWith('"') && defaultValue.endsWith('"'))) {
            defaultValue = defaultValue.substring(1, defaultValue.length - 1);
          }
          // debugLog(`Found default value for ${propName}: ${defaultValue}`);
        }
      }

      // Check for default in options object
      if (!defaultValue) {
        const defaultOptionMatch = fnString.match(/default\s*:\s*(?:['"]([^'"]+)['"]|([^,}]+))/);
        if (defaultOptionMatch) {
          defaultValue = defaultOptionMatch[1] || defaultOptionMatch[2];
          if (defaultValue) {
            defaultValue = defaultValue.trim();
            // debugLog(`Found default value in options for ${propName}: ${defaultValue}`);
          }
        }
      }

      // If we still don't have a type, try one more approach with model inputs
      if (!type && fnString.includes('model<')) {
        const modelTypeMatch = fnString.match(/model<([^>]+)>\(/);
        if (modelTypeMatch && modelTypeMatch[1]) {
          type = modelTypeMatch[1].trim();
          // debugLog(`Found type from model input for ${propName}: ${type}`);
        }
      }

      // Pass the extracted information to the callback
      callback(type, defaultValue, required);

    } catch (_) {
      // debugLog(`Error extracting signal types for ${propName}:`, error);
      callback(null, undefined, undefined);
    }
  }

  /**
   * Extract type information from Angular's internal type ID representation
   * @param typeId The Angular internal type ID
   * @param propName The property name (used for fallback type inference)
   * @returns The extracted type as a string
   */
  private extractTypeFromTypeId(typeId: string, propName: string): string {
    // debugLog(`Extracting type from typeId: ${typeId}`);

    // Common type patterns in Angular's type system
    if (typeId.includes('String')) {
      return 'string';
    } else if (typeId.includes('Number')) {
      return 'number';
    } else if (typeId.includes('Boolean')) {
      return 'boolean';
    } else if (typeId.includes('Date')) {
      return 'Date';
    } else if (typeId.includes('Array')) {
      return 'any[]';
    } else if (typeId.includes('InputType')) {
      return 'InputType';
    }

    // Check for custom type names that might be in the typeId
    // Extract the type name from patterns like 'T(TypeName)'
    const typeMatch = typeId.match(/T\(([^)]+)\)/);
    if (typeMatch && typeMatch[1]) {
      return typeMatch[1];
    }

    // Check for union types pattern
    const unionMatch = typeId.match(/Union\(([^)]+)\)/);
    if (unionMatch) {
      // Try to parse the union components
      const unionParts = unionMatch[1].split(',').map(part => part.trim());
      return unionParts.join(' | ');
    }

    // If we can't determine from typeId, fall back to name-based inference
    return this.inferTypeFromName(propName);
  }

  /**
   * Infer the type from an input function's string representation
   */
  private inferTypeFromInputFunction(fnString: string): string {
    // debugLog('Inferring type from function string:', fnString);

    // Direct type specification in the input function
    const typeMatch = fnString.match(/type\s*:\s*['"]([^'"]+)['"]/);
    if (typeMatch && typeMatch[1]) {
      // debugLog(`Found explicit type in config: ${typeMatch[1]}`);
      return typeMatch[1];
    }

    // Modern Angular signal-based inputs detection pattern
    // Match patterns like: input<string>('default') or input.required<InputType>()
    const signalInputMatch = fnString.match(/input(?:\.required)?<([^>]+)>\(/);
    if (signalInputMatch && signalInputMatch[1]) {
      // debugLog(`Found type in signal input generic: ${signalInputMatch[1]}`);
      return signalInputMatch[1];
    }

    // Check for transform functions which directly indicate type
    if (fnString.includes('numberAttribute') ||
        fnString.includes('inputTransform(parseFloat') ||
        fnString.includes('type: "number"') ||
        fnString.includes("type: 'number'") ||
        fnString.includes('NumberInput')) {
      // debugLog('Detected number type from attributes/transforms');
      return 'number';
    } else if (fnString.includes('booleanAttribute') ||
              fnString.includes('inputTransform(booleanAttribute') ||
              fnString.includes('type: "boolean"') ||
              fnString.includes("type: 'boolean'") ||
              fnString.includes('BooleanInput')) {
      // debugLog('Detected boolean type from attributes/transforms');
      return 'boolean';
    } else if (fnString.includes('DateInput') || fnString.includes('Date') ||
              fnString.includes('type: "Date"') ||
              fnString.includes("type: 'Date'")) {
      // debugLog('Detected Date type');
      return 'Date';
    } else if (fnString.includes('string[]') ||
               fnString.includes('Array<string>') ||
               fnString.includes('type: "string[]"') ||
               fnString.includes("type: 'string[]'")) {
      // debugLog('Detected string[] type');
      return 'string[]';
    } else if (fnString.includes('number[]') ||
               fnString.includes('Array<number>') ||
               fnString.includes('type: "number[]"') ||
               fnString.includes("type: 'number[]'")) {
      // debugLog('Detected number[] type');
      return 'number[]';
    } else if (fnString.includes('StringInput') ||
               fnString.includes('type: "string"') ||
               fnString.includes("type: 'string'")) {
      // debugLog('Detected string type');
      return 'string';
    } else if (fnString.includes('ObjectInput') ||
               fnString.includes('type: "object"') ||
               fnString.includes("type: 'object'")) {
      // debugLog('Detected object type');
      return 'object';
    }

    // Look for generic type parameters in the input function (older style decorators)
    const genericTypeMatch = fnString.match(/<([^>]+)>/);
    if (genericTypeMatch && genericTypeMatch[1]) {
      // debugLog(`Found type in generic: ${genericTypeMatch[1]}`);
      return genericTypeMatch[1];
    }

    // Try to infer from default value
    if (fnString.includes("'") || fnString.includes('"')) {
      // debugLog('Inferring string type from quotes in default value');
      return 'string';
    } else if (fnString.includes('true') || fnString.includes('false')) {
      // debugLog('Inferring boolean type from true/false literals');
      return 'boolean';
    } else if (/\b\d+(\.\d+)?\b/.test(fnString)) {
      // debugLog('Inferring number type from numeric literals');
      return 'number';
    } else if (fnString.includes('[]') || fnString.includes('Array')) {
      // debugLog('Inferring array type from [] or Array');
      return 'any[]';
    }

    // debugLog('Could not infer type, using "any"');
    return 'any';
  }

  /**
   * Infer the type from a property name using common patterns
   */
  private inferTypeFromName(propName: string): string {
    const nameLower = propName.toLowerCase();

    if (nameLower.endsWith('date')) {
      return 'Date';
    } else if (nameLower === 'disabled' || nameLower === 'enabled' ||
      nameLower === 'visible' || nameLower === 'required' ||
      nameLower.startsWith('is') || nameLower.startsWith('has')) {
      return 'boolean';
    } else if (nameLower.endsWith('count') || nameLower.endsWith('size') ||
      nameLower.endsWith('index') || nameLower.endsWith('length') ||
      nameLower === 'min' || nameLower === 'max') {
      return 'number';
    } else if (nameLower.endsWith('items') || nameLower.endsWith('options') ||
      nameLower.endsWith('list') || nameLower.endsWith('array')) {
      return 'any[]';
    } else if (nameLower.endsWith('type')) {
      return `${propName.replace(/type$/i, '')}Type`;
    }

    return 'any';
  }

  /**
   * Generate a sample HTML snippet for the component with its properties
   * @param componentDocumentation The component documentation object
   * @returns HTML string with a sample usage of the component
   */
  generateComponentSnippet(componentDocumentation: ComponentDocumentation): string {
    const { selector, properties } = componentDocumentation;

    // Start with the component selector
    let snippet = `<${selector}`;

    // Add the most common properties
    properties.forEach(prop => {
      if (prop.name === 'componentType') {
        snippet += `\n  [${prop.name}]="'text'"`;
      } else if (prop.name === 'componentLabel') {
        snippet += `\n  ${prop.name}="'Label'"`;
      } else if (prop.required) {
        if (prop.type === 'string') {
          snippet += `\n  [${prop.name}]="'Required value'"`;
        } else if (prop.type === 'number') {
          snippet += `\n  [${prop.name}]="0"`;
        } else if (prop.type === 'boolean') {
          snippet += `\n  [${prop.name}]="false"`;
        } else {
          snippet += `\n  [${prop.name}]="requiredValue"`;
        }
      }
    });

    // Add formControl as it's a common use case for inputs
    snippet += `\n  formControlName="exampleControl"`;

    // Close the tag
    snippet += `\n></${selector}>`;

    return snippet;
  }

  /**
   * Generate a simple list of component properties with descriptions
   * @param componentDocumentation The component documentation object
   * @returns A formatted string with a list of properties and their descriptions
   */
  generatePropertiesList(componentDocumentation: ComponentDocumentation): string {
    const { properties } = componentDocumentation;

    if (properties.length === 0) {
      return 'No input properties found for this component.';
    }

    // Sort properties alphabetically by name
    const sortedProperties = [...properties].sort((a, b) => a.name.localeCompare(b.name));

    let result = '';

    for (const prop of sortedProperties) {
      // Property name with required indicator
      result += `• **${prop.name}${prop.required ? '*' : ''}** `;

      // Type information
      result += `(${prop.type})`;

      // Default value if available
      if (prop.defaultValue !== undefined) {
        result += ` - Default: \`${prop.defaultValue}\``;
      }

      // Add line break
      result += '\n';

      // Description on a new line with indentation if available
      if (prop.description) {
        result += `  ${prop.description}\n`;
      }

      // Add spacing between properties
      result += '\n';
    }

    return result;
  }

  /**
   * Extract JSDoc comments for component properties
   * @param componentType The component class to analyze
   * @returns Map of property names to their JSDoc comments
   */
  private extractJSDocComments(componentType: Type<any>): Map<string, string> {
    const commentsMap = new Map<string, string>();
    debugLog(`Extracting JSDoc comments for component: ${componentType.name}`);

    // Extract comments from the component class and all of its superclasses
    this.extractJSDocCommentsFromClassHierarchy(componentType, commentsMap);

    return commentsMap;
  }

  /**
   * Recursively extract JSDoc comments from a class and its parent classes
   * @param classType The class to analyze
   * @param commentsMap Map to store property names and their JSDoc comments
   */
  private extractJSDocCommentsFromClassHierarchy(classType: Type<any>, commentsMap: Map<string, string>): void {
    if (!classType) {
      return;
    }

    try {
      // Try to get the class's constructor string representation
      const constructorString = classType.toString();

      debugLog(`Analyzing JSDoc comments for class: ${classType.name}`);

      // Look for property declarations with JSDoc comments
      // This regex finds JSDoc-style comments followed by property declarations
      const commentRegex = /\/\*\*([\s\S]*?)\*\/\s*(?:public|private|protected)?\s*(\w+)(?:\s*:\s*[^;]+)?;/g;

      let match;
      while ((match = commentRegex.exec(constructorString)) !== null) {
        const comment = match[1].trim();
        const propName = match[2];

        // Clean up the comment by removing * at the start of lines and trimming whitespace
        const cleanComment = comment
          .split('\n')
          .map(line => line.replace(/^\s*\*\s*/, '').trim())
          .filter(line => line && !line.startsWith('@')) // Remove empty lines and JSDoc tags
          .join(' ');

        // Only set the comment if it doesn't already exist (child class comments take precedence)
        if (cleanComment && !commentsMap.has(propName)) {
          commentsMap.set(propName, cleanComment);
          debugLog(`Found JSDoc comment for property ${propName}: ${cleanComment}`);
        }
      }

      // Also check for inline comments using // style
      const inlineCommentRegex = /\/\/\s*(.+)\s*\n\s*(?:public|private|protected)?\s*(\w+)(?:\s*:\s*[^;]+)?;/g;

      while ((match = inlineCommentRegex.exec(constructorString)) !== null) {
        const comment = match[1].trim();
        const propName = match[2];

        // Only set the comment if it doesn't already exist (child class comments take precedence)
        if (comment && !commentsMap.has(propName)) {
          commentsMap.set(propName, comment);
          debugLog(`Found inline comment for property ${propName}: ${comment}`);
        }
      }

      // Get the parent class and process it recursively
      const parentClass = Object.getPrototypeOf(classType);

      // Check if this is a valid class with a name property (to avoid going up to Object.prototype)
      if (parentClass && parentClass.name && parentClass.name !== 'Object' && parentClass.toString) {
        debugLog(`Found parent class: ${parentClass.name}, processing recursively`);
        this.extractJSDocCommentsFromClassHierarchy(parentClass, commentsMap);
      }
    } catch (error) {
      debugLog(`Error extracting JSDoc comments from ${classType?.name || 'unknown class'}:`, error);
    }
  }
}
