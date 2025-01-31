import { Injectable } from '@angular/core';
import TrackModel from '../models/track.model';
import { invoke } from '@tauri-apps/api/core';

@Injectable()
export class TrackService {
  async get_tracks(): Promise<readonly TrackModel[]> {
    const tracks = await invoke('get_all_tracks');
    return tracks as readonly TrackModel[];
  }
}
