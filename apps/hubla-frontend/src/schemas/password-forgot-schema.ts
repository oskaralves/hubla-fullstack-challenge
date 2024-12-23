import { z } from 'zod';

export const PasswordForgotSchema = z.object({
  email: z.string().email('Insira um e-mail válido.'),
});
