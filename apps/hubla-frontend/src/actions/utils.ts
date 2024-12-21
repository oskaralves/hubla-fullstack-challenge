import { DictionaryType, getDictionary } from '@/dictionaries';
import { ResponseError } from '@/types/common';
import { getLocale } from '@/utils/locale';

export const getMessage = async <K extends keyof DictionaryType | undefined>(
  key: K
) => {
  const locale = await getLocale();
  return getDictionary(locale, key);
};

export const getError = async (err: any): Promise<ResponseError> => {
  const {
    ERROR: { INTERNAL_SERVER_ERROR },
  } = await getMessage('feedback');

  const INTERNAL_ERROR = {
    code: err?.error?.statusCode || err?.cause?.code,
    message: INTERNAL_SERVER_ERROR,
    statusCode: 500,
  };

  return {
    success: false,
    error: err?.response?.data?.error || err?.error || INTERNAL_ERROR,
  };
};
