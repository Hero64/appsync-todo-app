export interface Props {
  value: string;
  placeholder: string;
  loading?: boolean;
  onChange: (value: string) => void;
  onEnter: () => void;
}
