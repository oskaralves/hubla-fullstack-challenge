import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  session: {
    strategy: 'jwt',
    // maxAge: 24 * 60 * 60, // 1 Day
  },
  providers: [],
  trustHost: process.env.NEXTAUTH_TRUST_HOST === 'true',
} satisfies NextAuthConfig;

// export default {
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const validatedFields = LoginSchema.safeParse(credentials);
//         if (validatedFields.success) {
//           const { email, password } = validatedFields.data;

//           const user = await accessTokenAction({
//             email,
//             password,
//           });

//           // console.log('user:::user', user);

//           if (!user) return null;

//           const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos

//           if (user) {
//             const accessTokenExp = JSON.parse(
//               Buffer.from(user.accessToken.split('.')[1], 'base64').toString()
//             ).exp as number;

//             cookies().set({
//               name: ACCESS_TOKEN_KEY,
//               value: user.accessToken,
//               maxAge: accessTokenExp - currentTime,
//               httpOnly: true,
//             });

//             const refreshTokenExp = JSON.parse(
//               Buffer.from(user.refreshToken.split('.')[1], 'base64').toString()
//             ).exp as number;

//             cookies().set({
//               name: REFRESH_TOKEN_KEY,
//               value: user.refreshToken,
//               maxAge: refreshTokenExp - currentTime,
//               httpOnly: true,
//             });

//             return user as any;
//           }
//         }
//         return null;
//       },
//     }),
//   ],
//   trustHost: process.env.NEXTAUTH_TRUST_HOST === 'true',
//   // debug:  process.env.NEXTAUTH_TRUST_HOST === 'true',
// } satisfies NextAuthConfig;
