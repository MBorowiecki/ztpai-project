import { ChangeEventHandler, HTMLInputTypeAttribute, type JSX } from 'react';

interface Props {
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  error?: string | boolean;
  className?: string;
}

export const Input = ({
  type,
  name,
  placeholder,
  onChange,
  className,
  error,
  value
}: Props): JSX.Element => {
  return (
    <>
      <input
        className={`input color-light_1 ${className ?? ''}`}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        value={value}
      />

      {error && <p className="mt-1 color-error_1 size-xs">{error}</p>}
    </>
  );
};
