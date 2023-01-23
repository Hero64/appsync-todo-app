import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import {} from "aws-amplify/src/Common/types/types";

import { graphQlToken } from "../../config/env";
import { Props } from "./types";

function useQuery<R, V extends object = any>(props: Props<V>) {
  const { query, index, callOnMounted, variables: defaultVariables } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<R>();

  const hasError = error !== "";

  const getQuery = async (variables?: V) => {
    setLoading(true);
    setError("");
    try {
      const { data: result, errors } = (await API.graphql<any>({
        query,
        variables,
        authMode: "API_KEY",
        authToken: graphQlToken,
      })) as GraphQLResult<any>;

      if (errors) {
        throw new Error(errors[0].message);
      }
      setData(result[index]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (callOnMounted) {
      getQuery(defaultVariables);
    }
  }, []);

  return {
    loading,
    hasError,
    data,
    error,
    getQuery,
    setData,
  };
}

export default useQuery;
