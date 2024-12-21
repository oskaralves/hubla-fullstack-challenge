import { APP_LOCALE_KEY } from '@/constants';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { locale } = await req.json();

  const response = NextResponse.json({ success: true });

  // Define o cookie de idioma no lado do servidor
  response.cookies.set(APP_LOCALE_KEY, locale, { path: '/' });

  return response;
}
