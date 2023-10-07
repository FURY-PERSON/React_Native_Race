export function isErrorWithMessage(error: unknown): error is {data: string} {
  return (
    typeof error === 'object' &&
    error != null &&
    'data' in error &&
    typeof error.data === 'string'
  );
}
