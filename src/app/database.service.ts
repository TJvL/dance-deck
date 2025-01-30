import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import TrackModel from './track.model';

@Injectable()
export default class DatabaseService {
  async add_track(track: TrackModel) {
    try {
      await invoke('add_track', { track });
    } catch (error) {
      console.error(error);
    }
  }
}
