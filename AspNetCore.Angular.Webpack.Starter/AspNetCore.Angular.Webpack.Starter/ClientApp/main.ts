import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Enable either Hot Module Reloading or production mode
if (module['hot'] && process.env.ENV !== 'production') {
    module['hot'].accept();
    module['hot'].dispose(() => { });
}

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'production') {
  enableProdMode();
}

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
