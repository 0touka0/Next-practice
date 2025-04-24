export type InputType = {
  id: string;
  label: string;
  type: string;
  value: string | number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  labelClassName?: string;
  inputClassName?: string;
};
