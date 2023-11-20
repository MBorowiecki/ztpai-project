import { Company } from 'features/companies/data';
import { type JSX } from 'react';

interface Props {
  company?: Company;
}

export const TopBar = ({ company }: Props): JSX.Element => {
  return (
    <div className="topbar pv-2 ph-2">
      <div className="row">
        <h1 className="size-xl color-light_2">{company ? company.name : 'Create your company'}</h1>
      </div>
    </div>
  );
};
