import { Injectable } from '@angular/core';
import { open } from '@tauri-apps/plugin-dialog';

@Injectable()
export class LibraryService {
  async openFolderSelectDialog(): Promise<string | null> {
    return open({
      multiple: false,
      directory: true,
    });
  }
}
