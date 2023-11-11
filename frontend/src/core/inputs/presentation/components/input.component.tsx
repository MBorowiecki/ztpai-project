import { ChangeEventHandler, type JSX } from 'react';

interface Props {
  type: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  className?: string;
}

export const Input = ({ type, placeholder, onChange, className, error }: Props): JSX.Element => {
  return (
    <>
      <input
        className={`input color-light_1 ${className ?? ''}`}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />

      {error && <p className="mt-1 color-error_1 size-xs">{error}</p>}
    </>
  );
};
