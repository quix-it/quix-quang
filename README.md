# Quang

Quang is the UI component library developed by Quix for front end projects with Angular framework. It is based on the
bootstrap design system and consists of:

* 2 modules for managing the authentication flow
* 9 graphic components
* 2 services for socket management
* 42 components
* 2 directives for the management of authenticated files
* 7 utility services

The goal of this library is to speed up code writing and lower the percentage of errors by standardizing the components
most used in projects and thus allowing each developer to focus attention on the design logic. Compared to previous
versions, quang has been divided into modules by lowering the size of the release build, obsolete files have been
deleted and all functions have been optimized and commented. Quang 11.0.0 is not in its eleventh version, but by whole
convention in Quix the major of the version coincides with the major of the Angular version.

## Install

To add the dependency to the Angular project you need to add the dependency in the package.json file:
`"@quix/quang": "11.0.0",`

This dependency is already included in the blank project. This library is only available if connected to Quix npm
repository to login follow the procedure in the FE developer manual. To use a quang module just declare that module in
the project module imports.

`imports: [
CommonModule, 
ReactiveFormsModule, 
SharedModule, 
QuangCardsModule, 
QuangCoreModule,
QuangDateModule, 
TranslocoModule
],`

