export interface Props<V> {
  query: string;
  index: string;
  callOnMounted?: boolean;
  variables?: V;
}
