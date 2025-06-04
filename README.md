# Quix Quang

Angular component and utility library developed by [Quix Srl](https://www.quixconsulting.com).

## Project Structure

This repository consists of two main parts:

1. **Quang Library** (`/projects/quang`): A comprehensive Angular library containing various components, services, and utilities for building Angular applications:
   - Authentication services and directives
   - UI components (autocomplete, checkboxes, date pickers, etc.)
   - Form utilities
   - Loading indicators
   - Overlay components (modals, popovers, toasts, tooltips)
   - Translation services
   - And more
   
   For detailed documentation on Quang components and modules, see the [Quang README](/projects/quang/README.md).

2. **Playground** (`/projects/playground`): A testing application for demonstrating and testing the Quang library components and features.

## Getting Started

### Prerequisites

- Node.js 20 (compatible with Angular v19)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/quix-it/quix-quang.git
cd quix-quang

# Install dependencies
npm install
```

## Development

### Running the Playground

To start the playground application for testing and development:

```bash
npm run start:playground
```

This will serve the playground application locally at `http://localhost:4400/`.

### Building the Quang Library

To build the Quang library:

```bash
npm run build:quang
```

The built library will be available in the `dist/quang` directory.

## Deployment

### Publishing the Library

Several npm scripts are available for publishing the library:

```bash
# Publish a prerelease version
npm run publish:prerelease

# Publish a patch version
npm run publish:patch

# Publish a minor version update
npm run publish:minor

# Publish a major version update
npm run publish:major
```

### Deploying the Playground

To deploy the playground application:

```bash
npm run deploy:git
```

This will deploy the playground to GitHub Pages with the base href `/quix-quang/`.

## Development Workflow

### Linting and Formatting

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Lint and format in one command
npm run lint-and-format
```

## Version Management

The project uses npm versioning with automatic synchronization between the root package.json and the library's package.json:

```bash
# The sync-version script is automatically run during versioning
npm version [patch|minor|major]
```

## License

Quang may be freely distributed under the MIT license.
