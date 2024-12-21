import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export function formatData(
  data?: string | Date,
  options: { formatIn?: string; formatOut?: string } = {
    formatIn: 'YYYY-MM-DD',
    formatOut: 'DD/MM/YYYY',
  }
) {
  const dataMoment = moment(data, options?.formatIn);
  return dataMoment.format(options?.formatOut);
}

export function formateDayAndMonthInFull(dateString = '') {
  if (dateString === '') {
    return dateString;
  }
  const date = moment(dateString, 'DD/MM/YYYY');
  return date.format('DD [de] MMMM');
}

export function extractDateYear(dateString = '') {
  if (dateString === '') {
    return dateString;
  }
  const date = moment(dateString, 'DD/MM/YYYY');
  return date.format('YYYY');
}

export function extractDateMonth(dateString = '') {
  if (dateString === '') {
    return dateString;
  }
  const date = moment(dateString, 'DD/MM/YYYY');
  return date.format('MMMM');
}

export function dateFormatDayAndMonth(dateString = '') {
  if (dateString === '') {
    return dateString;
  }
  return `${dateString.substring(0, 2)}/${dateString.substring(3, 5)}`;
}

export function diffInMonths(startDate: Date, endDate: Date): number {
  const start = moment(startDate.toISOString().slice(0, 10));
  const end = moment(endDate.toISOString().slice(0, 10));

  const diffInMonths = end.diff(start, 'months');

  return diffInMonths;
}

export function diffInDays(startDate: Date, endDate: Date): number {
  const start = moment(startDate);
  const end = moment(endDate);

  const diffInDays = end.diff(start, 'days');

  return diffInDays < 0 ? diffInDays * -1 : diffInDays;
}

export function subtractDays(date?: Date, subtractDays?: number) {
  if (!date || !subtractDays) {
    return '';
  }

  return moment(date).subtract(subtractDays, 'd').format('DD/MM/yyyy');
}

export function convertStringToDate(date?: string) {
  if (!date) {
    return undefined;
  }

  return new Date(String(moment(date, 'DD/MM/YYYY')));
}

export const convertDateStringYYYYMMDDToDate = (
  dateString: string
): Date | null => {
  try {
    if (dateString === null) {
      return null;
    }

    const [year, month, day] = dateString.split('-').map(Number);
    const convertedDate = new Date(year, month - 1, day);
    if (isNaN(convertedDate.getTime())) {
      return null;
    }
    const formattedDate = convertedDate.toISOString().slice(0, 10);

    if (formattedDate !== dateString) {
      return null;
    }

    return convertedDate;
  } catch (error) {
    console.error('Erro de conversão de Data YYYY-MM-DD:', error);
    return null;
  }
};
