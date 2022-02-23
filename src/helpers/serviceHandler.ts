import { ResponseError } from '../helpers/errors';

export const serviceHandler = async <T = unknown>(
  executionFn: () => Promise<T>,
) => {
  let data: T | null = null;
  let error: ResponseError | null = null;

  try {
    data = await executionFn();
  } catch (ex) {
    error = ex as ResponseError;
  }

  return { data, error };
};
