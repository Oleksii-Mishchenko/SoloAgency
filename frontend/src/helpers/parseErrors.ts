import { ServerErrorResponse } from '../types/ServerErrorResponse';

export const parseErrors = (jsonError?: string): ServerErrorResponse => {
  const commonErrors: string = '{ "Помилка": "Щось пішло не так" }';

  const serverErrors = JSON.parse(jsonError || commonErrors);

  for (const key in serverErrors) {
    if (typeof serverErrors[key] === 'string') {
      serverErrors[key] = [serverErrors[key]];
    }
  }

  const errors: ServerErrorResponse = serverErrors;

  return errors;
};
