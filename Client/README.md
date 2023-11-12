 ovde stao https://medium.com/@redin.gaetan/angular-for-everyone-chapter-4-services-61beaa998a86
# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

### Create item

https://material.angular.io/guide/schematics#dashboard-schematic
Address form schematic  `ng generate @angular/material:address-form <component-name>`
Navigation schematic    `ng generate @angular/material:navigation <component-name>`
Table schematic    `ng generate @angular/material:table <component-name>`
Dashboard schematic    `ng generate @angular/material:dashboard <component-name>`
Tree schematic    `ng generate @angular/material:tree <component-name>`
Drag and Drop schematic    `ng generate @angular/cdk:drag-drop <component-name>`

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Create feature module
    *   https://angular.io/guide/lazy-loading-ngmodules
    Run `ng generate module [module name] --route [route] --module app.module`

## Build

Run `ng build --localize` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploy to fierbase - it's not working there
Enable `ng add @angular/fire`
Run    `ng deploy`

## Localization

Guide for localization can be found here https://angular.io/guide/i18n-overview
    * extract dictionary 
    Run `ng extract-i18n --output-path src/locale`

## Material design 

This app is using material design https://material.angular.io/guide/getting-started
