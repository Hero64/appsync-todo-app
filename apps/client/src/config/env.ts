const {
  VITE_GRAPHQL_ENDPOINT: graphQlEndpoint,
  VITE_GRAPHQL_TOKEN: graphQlToken,
  VITE_AWS_REGION: awsRegion,
} = import.meta.env;

console.log(graphQlEndpoint);

export { graphQlEndpoint, graphQlToken, awsRegion };
