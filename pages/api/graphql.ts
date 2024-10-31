import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { getToken } from 'next-auth/jwt';

import { resolvers } from '@/graphql/resolvers';
import { typeDefs } from '@/graphql/typedefs';

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req) => {
    const token = await getToken({
      req: req as any,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName:
        process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token',
      secureCookie: true,
    });

    console.log(token);

    return { userId: token?.sub, role: token?.role };
  },
});
