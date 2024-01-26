import { Button } from 'core/buttons/presentation';
import { Company } from 'features/companies/data';
import { type JSX } from 'react';
import { FaMoneyBill } from 'react-icons/fa';
import { MdOutlineMenu } from 'react-icons/md';

interface Props {
  company?: Company;
  setSidebarOpen: (open: boolean) => void;
}

export const TopBar = ({ company, setSidebarOpen }: Props): JSX.Element => {
  return (
    <div className="topbar pv-2 ph-2">
      <div className="row row-vcenter">
        <Button
          type="clear"
          className="mr-2 sidebar--menu--icon"
          onClick={() => setSidebarOpen(true)}>
          <MdOutlineMenu size={32} />
        </Button>
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
