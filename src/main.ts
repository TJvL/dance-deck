import { bootstrapApplication } from '@angular/platform-browser';
import { attachConsole } from '@tauri-apps/plugin-log';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

attachConsole().catch((error) => console.error(error));
bootstrapApplication(AppComponent, appConfig).catch((error) => console.error(error));
