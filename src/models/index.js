import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
const httpLink = new HttpLink({
  uri: "http://46.101.1.15:4000/",
});

const wsLink = new WebSocketLink({
  uri: `ws://46.101.1.15:4000/graphql`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
