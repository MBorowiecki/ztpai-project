import { Company } from 'features/companies/data';
import { type JSX } from 'react';
import { FaMoneyBill } from 'react-icons/fa';

interface Props {
  company?: Company;
}

export const TopBar = ({ company }: Props): JSX.Element => {
  return (
    <div className="topbar pv-2 ph-2">
      <div className="row">
        <div className="col col-grow">
          <h1 className="size-xl color-light_2">
            {company ? company.name : 'Create your company'}
          </h1>
        </div>
        <div className="row row-vcenter">
          <FaMoneyBill className="size-xl color-green_1 mr-2" />
          <p className="size-m color-green_1">{company?.money ?? 0}€</p>
        </div>
      </div>
    </div>
  );
};
