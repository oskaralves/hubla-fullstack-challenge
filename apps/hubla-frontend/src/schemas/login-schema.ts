import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Insira um e-mail válido.'),
  password: z.string().min(1, 'A senha é obrigatória'),
});
