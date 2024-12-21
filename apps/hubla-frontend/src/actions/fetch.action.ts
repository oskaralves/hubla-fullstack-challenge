'use server';

import { api } from '@/lib/api';
import { ResponseException } from '@/types/exception';
import { revalidatePath } from 'next/cache';

type FetchActionProps = {
  endpoint: string;
  path?: string;
};

export const fetchAction = async <T = ResponseException>({
  endpoint,
  path,
}: FetchActionProps): Promise<T> => {
  try {
    const url = `${endpoint}`;
    const res = await api.fetch(url, {
      // next: { revalidate: 5 },
      withCredentials: true,
    });

    if (path) revalidatePath(path);
    //await new Promise((resolve) => setTimeout(resolve, 7000));

    if (res.ok) {
      return (await res.json()) as T;
    }
    return (await res.json()) as T;
  } catch (error: any) {
    return error?.response?.data as T;
  }
};
