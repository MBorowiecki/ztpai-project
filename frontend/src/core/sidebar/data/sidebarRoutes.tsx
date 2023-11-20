import { FaBuilding, FaPowerOff } from 'react-icons/fa';

import { SidebarRoute } from './models/sidebarRoute.model';

export const sidebarRoutes: SidebarRoute[] = [
  {
    name: 'Company',
    icon: <FaBuilding />,
    onClickAction: {
      type: 'push',
      payload: '/company'
    }
  },
  {
    name: 'Logout',
    icon: <FaPowerOff />,
    onClickAction: {
      type: 'logout'
    },
    error: true
  }
];
