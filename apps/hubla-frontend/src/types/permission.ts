import { z } from 'zod';

export const permissionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
});

export type Permission = z.infer<typeof permissionSchema>;
