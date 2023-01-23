export interface SubscribeOptions<R, V> {
  variables?: V;
  onMessage: (data: R) => void;
}

export interface Props<R, V> extends Partial<SubscribeOptions<R, V>> {
  query: string;
  subscribeOnMount?: boolean;
}
