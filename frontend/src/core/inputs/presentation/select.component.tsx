import { ChangeEventHandler, type JSX } from 'react';

interface Props {
  name: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value?: string;
  error?: string | boolean;
  className?: string;
  children?: JSX.Element | JSX.Element[];
}

export const Select = ({
  name,
  placeholder,
  onChange,
  className,
  error,
  value,
  children
}: Props): JSX.Element => {
  return (
    <>
      <select
        className={`input color-light_1 ${className ?? ''}`}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        value={value}>
        {children}
      </select>

      {error && <p className="mt-1 color-error_1 size-xs">{error}</p>}
    </>
  );
};
