import { z } from 'zod';

export const ApiErrorSchema = z.object({
  error: z.string(),
  message: z.string().optional()
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export class ApiError extends Error {
  constructor(
    public status: number,
    public error: string,
    public message?: string
  ) {
    super(message || error);
    this.name = 'ApiError';
  }
}

export function validateRequest<T extends z.ZodSchema>(
  schema: T,
  data: unknown
): z.infer<T> {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError(400, 'Validation Error', error.errors.map(err => err.message).join(', '));
    }
    throw error;
  }
}