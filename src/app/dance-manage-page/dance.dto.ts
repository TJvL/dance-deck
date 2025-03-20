export interface DanceEntryDto {
  readonly id: number;
  readonly name: string;
  readonly category: string;
  readonly synonyms: readonly SynonymEntryDto[];
}

export interface NewDanceRecordDto {
  readonly name: string;
  readonly categoryId: number;
}

export interface SynonymEntryDto {
  readonly id: number;
  readonly name: string;
}

export interface NewSynonymRecordDto {
  readonly name: string;
  readonly danceId: number;
}
