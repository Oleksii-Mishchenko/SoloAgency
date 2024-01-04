import { ServerErrorResponse } from '../types/ServerErrorResponse';

export const parseErrors = (jsonError?: string): ServerErrorResponse => {
  const commonErrors: string = '{ "error": "Something went wrong" }';

  const serverErrors = JSON.parse(jsonError || commonErrors);

  for (const key in serverErrors) {
    if (typeof serverErrors[key] === 'string') {
      serverErrors[key] = [serverErrors[key]];
    }
  }

  const errors: ServerErrorResponse = serverErrors;

  return errors;
};
