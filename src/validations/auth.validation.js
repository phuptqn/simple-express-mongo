import { z } from 'zod';

export const loginSchema = z.object({
  name: z.string().min(1),
  password: z.string().min(1),
});

export const registerSchema = loginSchema;

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});
