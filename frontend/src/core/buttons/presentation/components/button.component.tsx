interface Props {
  text: string;
  onClick: () => void;
  error?: string;
  className?: string;
}

export const Button = ({ text, onClick, error, className }: Props): JSX.Element => {
  return (
    <>
      <button
        type="button"
        className={`button button-primary ${className ?? ''}`}
        onClick={onClick}>
        {text}
      </button>

      {error && <p className="mt-1 color-error_1 size-xs">{error}</p>}
    </>
  );
};
