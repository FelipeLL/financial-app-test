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
      secureCookie: process.env.NODE_ENV === 'production',
    });

    if (!token) {
      throw new Error('Unauthorized');
    }

    return { userId: token?.sub, role: token?.role };
  },
});
