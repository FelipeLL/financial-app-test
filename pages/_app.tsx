import Layout from '@/components/layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}
