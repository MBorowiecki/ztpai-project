import { FaBuilding, FaCar, FaPowerOff } from 'react-icons/fa';
import { PiEngineFill } from 'react-icons/pi';

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
    name: 'Engines',
    icon: <PiEngineFill />,
    onClickAction: {
      type: 'push',
      payload: '/engines'
    }
  },
  {
    name: 'Cars',
    icon: <FaCar />,
    onClickAction: {
      type: 'push',
      payload: '/cars'
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
