import { Button } from 'core/buttons/presentation';
import { type JSX } from 'react';

interface Props {
  name: string;
  icon: JSX.Element;
  active?: boolean;
  disabled?: boolean;
  error?: boolean;
  onClick: () => void;
}

export const SidebarItem = ({ name, icon, active, disabled, error, onClick }: Props) => {
  const getColor = (): string => {
    if (disabled) return 'color-dark_6';

    if (error) return 'color-error_1';

    if (active) return 'color-light_1';

    return 'color-light_6';
  };

  return (
    <Button
      type={active && !disabled ? 'primary' : 'clear'}
      className="ph-1 pv-1 mv-1"
      onClick={onClick}
      disabled={disabled}>
      <div className={`sidebar--item ${getColor()} size-m`}>
        {icon}
        <p className="size-xs mt-1">{name}</p>
      </div>
    </Button>
  );
};
