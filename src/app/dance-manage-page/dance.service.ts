import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

import { DanceEntryDto, NewDanceRecordDto, NewSynonymRecordDto } from './dance.dto';

@Injectable({
  providedIn: 'root',
})
export class DanceService {
  async getList() {
    return await invoke<DanceEntryDto[]>('get_all_dances');
  }

  async add(newDanceRecord: NewDanceRecordDto) {
    return await invoke<void>('add_dance', {
      newDance: newDanceRecord,
    });
  }

  async remove(danceId: number) {
    return await invoke<void>('remove_dance', { danceId });
  }

  async addSynonym(newSynonymRecord: NewSynonymRecordDto) {
    return await invoke<void>('add_synonym', { newSynonym: newSynonymRecord });
  }

  async removeSynonym(synonymId: number) {
    return await invoke<void>('remove_synonym', { synonymId });
  }
}
