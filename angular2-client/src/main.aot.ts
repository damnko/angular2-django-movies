/*
 * Angular bootstraping
 */
import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModuleNgFactory } from '../build/src/app/app.module.ngfactory';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory)
    .catch((err) => console.error(err));
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
