import { type JSX, MouseEventHandler } from 'react';

interface Props {
  type?: 'primary' | 'secondary' | 'tertiary' | 'clear' | 'error';
  children: JSX.Element | string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  error,
  className,
  disabled,
  type = 'primary'
}: Props): JSX.Element => {
  return (
    <>
      <button
        type="button"
        className={`button button-${type} ${className ?? ''}`}
        onClick={onClick}
        disabled={disabled}>
        {children}
      </button>

      {error && <p className="mt-1 color-error_1 size-xs">{error}</p>}
    </>
  );
};
