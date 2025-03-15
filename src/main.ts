import { bootstrapApplication } from '@angular/platform-browser';
import { attachConsole, error } from '@tauri-apps/plugin-log';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

attachConsole().catch((err) => error(`error on start up: ${err.message}`));
bootstrapApplication(AppComponent, appConfig).catch((err) => error(`error on start up: ${err.message}`));
