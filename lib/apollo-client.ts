import { GRAPHQL_ENDPOINT, SERVER_URL } from "@/utilities/endpoints";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuthStore } from "./auth-store";

const httpLink = createHttpLink({
  uri: SERVER_URL + GRAPHQL_ENDPOINT,
});

const { token } = useAuthStore();

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const authToken = typeof window !== "undefined" ? token : null;
  console.log(authToken, "authToken");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${authToken}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
