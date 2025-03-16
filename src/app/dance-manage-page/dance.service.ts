import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

import { DanceDto } from './dance.dto';

@Injectable({
  providedIn: 'root',
})
export class DanceService {
  async getAll() {
    return await invoke<DanceDto[]>('get_all_dances');
  }
}
