import { authConfig } from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import Negotiator from "negotiator";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { APP_LOCALE_KEY } from "./constants";
import { LOGIN_URL } from "./navigation/urls";

export const { auth } = NextAuth(authConfig);

const locales = ["pt-BR", "en-US"];
const defaultLocale = "pt-BR";

function getPreferredLocale(request: Request) {
  const negotiator = new Negotiator({
    headers: {
      "accept-language": request.headers.get("accept-language") || "",
    },
  });
  const languages = negotiator.languages();
  return languages.find((lang) => locales.includes(lang)) || defaultLocale;
}

export default auth(async (req) => {
  const { nextUrl, cookies } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Internacionalização: Verifica o cookie de idioma ou define o idioma preferido
  const localeFromCookie = cookies.get(APP_LOCALE_KEY);
  const preferredLocale = localeFromCookie?.value || getPreferredLocale(req);

  // Definir o cookie de idioma se ainda não estiver presente
  const response = NextResponse.next();
  if (!localeFromCookie) {
    response.cookies.set(APP_LOCALE_KEY, preferredLocale);
  }

  // Se for uma rota da API de autenticação, não faz nada
  if (isApiAuthRoute) {
    return response;
  }

  // Verifica se o usuário está tentando acessar uma rota de autenticação
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return response;
  }

  // Verifica se o usuário não está logado e está tentando acessar uma rota privada
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN_URL, nextUrl));
  }

  // Retorna a resposta com o idioma configurado
  return response;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
