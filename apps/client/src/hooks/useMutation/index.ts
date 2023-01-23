import { useState } from "react";
import { API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import {} from "aws-amplify/src/Common/types/types";

import { graphQlToken } from "../../config/env";
import { Props } from "./types";

function useMutation<R, V extends object = any>(props: Props) {
  const { query } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasError = error !== "";

  const mutate = async (variables?: V): Promise<R> => {
    setLoading(true);
    setError("");
    try {
      const { data, errors } = (await API.graphql<R>({
        query,
        variables,
        authMode: "API_KEY",
        authToken: graphQlToken,
      })) as GraphQLResult<R>;

      if (errors) {
        throw new Error(errors[0].message);
      }

      return data as R;
    } catch (e: any) {
      console.log(e);
      setError(e.message);
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    hasError,
    error,
    mutate,
  };
}

export default useMutation;
