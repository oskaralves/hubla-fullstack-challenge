import { z } from 'zod';
export const CodeSchema = z.object({
  code: z
    .string()
    .min(6, 'O código deve ter no mínimo 6 caracteres')
    .max(6, 'O código deve ter no máximo 6 caracteres'),
});

export const NewPasswordSchema = z
  .object({
    code: z
      .string()
      .min(6, 'O código deve ter no mínimo 6 caracteres')
      .max(6, 'O código deve ter no máximo 6 caracteres'),
    password: z.string().min(6, 'Mínimo de 6 caracteres'),
    passwordConfirmation: z.string().min(6, 'Mínimo de 6 caracteres'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'], // Indica onde o erro deve ser mostrado
  });
