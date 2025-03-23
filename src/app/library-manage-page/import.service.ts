import { Injectable, Signal, signal } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

import { ImportProgressDto } from './library.dto';

@Injectable()
export class ImportService {
  private readonly importStarted = signal<boolean>(false);
  private readonly currentImportProgress = signal<ImportProgressDto>({
    percentage: 0,
    currentFileName: '',
    errorMessage: null,
  });

  get started(): Signal<boolean> {
    return this.importStarted.asReadonly();
  }

  get progress(): Signal<ImportProgressDto> {
    return this.currentImportProgress.asReadonly();
  }

  async startImport(directoryPath: string): Promise<void> {
    const unsubscribeImportStartedEvent = await listen<void>('import_started', (_event) => {
      this.importStarted.set(true);
    });
    const unsubscribeImportProgressEvent = await listen<ImportProgressDto>('import_progress', (event) => {
      this.currentImportProgress.set(event.payload);
    });
    await invoke<string>('import_all_tracks', { directory_path: directoryPath });
    unsubscribeImportStartedEvent();
    unsubscribeImportProgressEvent();
    this.importStarted.set(false);
  }
}
