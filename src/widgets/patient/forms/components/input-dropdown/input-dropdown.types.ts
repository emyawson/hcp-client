export type InputDropdownProps = {
  readonly id: string;
  readonly label: string;
  readonly options: Array<{ label: string; value: string }>;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly required?: boolean;
  readonly onChange: () => void;
  readonly hasError?: boolean;
};
