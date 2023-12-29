import { Errors } from '../types/Errors';

export const parseErrors = (JSONError?: string): Errors => {
  const commonErrors: Errors = { error: ['Something went wrong.'] };
  const errors = JSONError ? JSON.parse(JSONError) : commonErrors;

  return errors;
};
