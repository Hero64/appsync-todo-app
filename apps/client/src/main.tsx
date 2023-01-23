import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";

import App from "./App";
import { awsRegion, graphQlEndpoint, graphQlToken } from "./config/env";
import "./styles/main.css";

Amplify.configure({
  aws_appsync_graphqlEndpoint: graphQlEndpoint,
  aws_appsync_region: awsRegion,
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: graphQlToken,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
