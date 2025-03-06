import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

import { TrackDto } from '../../data-transfer-objects';

@Injectable()
export class TrackService {
  async get_tracks(): Promise<readonly TrackDto[]> {
    const tracks = await invoke('get_all_tracks');
    return tracks as readonly TrackDto[];
  }
}
