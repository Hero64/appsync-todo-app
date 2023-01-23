import { useEffect, useRef } from "react";
import { API } from "aws-amplify";
import {} from "aws-amplify/src/Common/types/types";

import { graphQlToken } from "../../config/env";
import { Props, SubscribeOptions } from "./types";
import { Observable, Subscription } from "zen-observable-ts";

function useSubscription<T, V extends object = any>(props: Props<T, V>) {
  const {
    query,
    subscribeOnMount = false,
    variables: defaultVariables,
    onMessage: defaultMessageHandler = () => {},
  } = props;
  const subscription = useRef<Subscription>();

  const subscribe = async (options: SubscribeOptions<T, V>) => {
    const { variables, onMessage } = options;

    subscription.current = (
      API.graphql<T>({
        query,
        variables,
        authMode: "API_KEY",
        authToken: graphQlToken,
      }) as unknown as Observable<object>
    ).subscribe({
      next: (data: any) => {
        onMessage(data.value.data as T);
      },
    });
  };

  const unsubscribe = () => {
    subscription.current?.unsubscribe();
  };

  useEffect(() => {
    if (subscribeOnMount) {
      subscribe({
        variables: defaultVariables,
        onMessage: defaultMessageHandler,
      });
    }
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    subscribe,
    unsubscribe,
  };
}

export default useSubscription;
