"use client";

import { useAuthStore } from "@/lib/auth-store";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GRAPHQL_ENDPOINT, SERVER_URL } from "@/utilities/endpoints";
import { useMemo } from "react";

export function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuthStore();

  const client = useMemo(() => {
    const httpLink = createHttpLink({
      uri: SERVER_URL + GRAPHQL_ENDPOINT,
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [token]); // re-creates client if token changes

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
