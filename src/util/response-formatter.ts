export const responseFormatter = (success: boolean, data: unknown): Record<string, unknown> =>
  success ? { success, data } : { success, error: data };
