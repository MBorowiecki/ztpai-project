import { type JSX } from 'react';
import { BiSolidFactory } from 'react-icons/bi';
import { FaBuilding } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';

import { SidebarItem } from './sidebarItem.component';

interface Props {
  hasCompany: boolean;
}

export const Sidebar = ({ hasCompany }: Props): JSX.Element => {
  return (
    <div className="sidebar">
      <div className="sidebar--menu pt-2">
        <SidebarItem name="Company" icon={<FaBuilding />} active />
        <SidebarItem name="Factories" icon={<BiSolidFactory />} disabled={!hasCompany} />
        <SidebarItem name="Settings" icon={<FaGear />} disabled={!hasCompany} />
      </div>
    </div>
  );
};
