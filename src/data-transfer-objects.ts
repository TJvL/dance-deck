export interface ImportedResultDto {
  trackName?: string;
  artistName?: string;
  danceName?: string;
}

export interface TrackDto {
  id: number;
  trackName: string;
  artistName: string;
  danceName?: string;
  playbackCount: number;
}
