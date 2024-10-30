import { NextAuthConfig } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

export default {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    }),
  ],
} satisfies NextAuthConfig;
