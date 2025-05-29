# Quang

Quang is a comprehensive Angular component and utility library designed to streamline common operations in Angular applications.

## Project Structure

The library is organized into several functional modules, each focusing on different aspects of application development:

### [Auth](auth/auth)
Authentication and authorization utilities including:
- Authentication services and providers
- Role-based access control directives
- Authentication guards
- Token storage management
- Mobile-specific authentication features

### [Components](components)
Reusable UI components including:
- Autocomplete
- Checkbox
- Date inputs
- Form inputs
- Paginator
- Select dropdowns
- Tables
- WYSIWYG editor

### [Data Handling](core/data-handling)
Utilities for:
- Data conversion operations
- File download helpers

### [Device](core/device)
Device and viewport management utilities including:
- Resize observable service for responsive design

### [Forms](core/forms)
Form management utilities including:
- Form group model abstractions
- Custom form validators

### [Loader](components/loader)
Loading state management including:
- Loading indicator components
- Loading state interceptor
- Loading service

### [Network](network)
Network request utilities and services.
- Interceptor utilities

### [Overlay](overlay)
Overlay-based UI components including:
- Modals
- Popovers
- Toasts
- Tooltips

### [Translation](translation)
Internationalization (i18n) utilities including:
- Translation loader service
- Translation providers
- Translation tokens

## Getting Started

To use Quang in your project, install it via npm:

```bash
npm install quang
```

## Usage

Quang uses standalone components, which means you can import only the specific components you need directly into your application:

```typescript
// Import services
import { AuthService } from 'quang/auth';
import { LoaderService } from 'quang/loader';

// Import components
import { SelectComponent } from 'quang/components/select';
import { PaginatorComponent } from 'quang/components/paginator';
import { LoaderComponent } from 'quang/loader';

// Import directives
import { IsAuthenticatedDirective } from 'quang/auth';
```

You can then use these components directly in your standalone components:

```typescript
@Component({
  standalone: true,
  imports: [SelectComponent, PaginatorComponent, LoaderComponent, IsAuthenticatedDirective],
  // ...
})
export class YourComponent {
  // ...
}
```

For more detailed information about each component and feature, please refer to the corresponding README linked in the project structure section.
