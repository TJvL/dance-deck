export interface DanceEntryDto {
  readonly name: string;
  readonly category: string;
  readonly synonyms: readonly string[];
}

export interface NewDanceRecordDto {
  readonly name: string;
  readonly category_id: number;
  readonly synonyms: readonly string[];
}
