import { ApplicationErrorDto } from './error.dto';

export function isApplicationError(error: any): error is ApplicationErrorDto {
  return error.message;
}

export function checkIfKnownError(error: any): ApplicationErrorDto {
  return isApplicationError(error) ? error : { message: 'an unexpected error occurred' };
}
