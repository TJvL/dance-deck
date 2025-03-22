export interface ApplicationErrorDto {
  kind: 'unexpected' | 'config' | 'database' | 'fileSystem' | 'mutexLock';
  message: string;
}
