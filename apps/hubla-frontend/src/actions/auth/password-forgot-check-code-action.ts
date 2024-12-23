'use server';

import { api } from '@/lib/api';
import { CodeSchema } from '@/schemas/new-password-schema';
import { z } from 'zod';

export const passwordForgotCheckCodeAction = async (
  values: z.infer<typeof CodeSchema>
) => {
  try {
    const validateFields = CodeSchema.safeParse(values);

    if (!validateFields.success) {
      return { error: 'invalid fields !' };
    }

    const { code } = validateFields.data;

    const res = await api.fetch(`/auth/password/forgot/check/${code}`, {
      withCredentials: false,
    });

    if (res.ok) {
      return {
        success: 'Código verificado com sucesso',
      };
    }
    const { error } = await res.json();

    return { error: error?.message || '' };
  } catch (error: any) {
    return {
      error: error?.response?.message || error?.message || 'Fail',
    };
  }
};
