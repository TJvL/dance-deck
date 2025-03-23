import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  async getLibraryRoot() {
    return await invoke<string>('get_library_root');
  }

  async chooseLibraryRoot() {
    return await invoke<string | null>('choose_library_root');
  }

  async importFolderToLibrary() {
    return await invoke('get_library_root');
  }
}
