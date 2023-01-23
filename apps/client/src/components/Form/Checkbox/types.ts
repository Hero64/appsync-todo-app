export interface Props {
  checked: boolean;
  label: string;
  loading?: boolean;
  onChange: (checked: boolean) => void;
}
