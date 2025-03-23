export interface ImportedTrackDto {
  readonly dance_name: string;
  readonly artist_name: string;
  readonly title: string;
  readonly file_path: string;
}

export interface ImportProgressDto {
  readonly percentage: number;
  readonly currentFileName: string;
  readonly errorMessage: string | null;
}
