import { useAppDispatch } from 'core/hooks';
import { useLocalStorage } from 'core/localStorage/localStorage.hook';
import { logout } from 'core/store/user';
import { UserProfile } from 'features/login/types';
import { type JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { sidebarRoutes } from '../data';
import { SidebarItem } from './sidebarItem.component';

interface Props {
  hasCompany: boolean;
  sidebarOpen: boolean;
}

export const Sidebar = ({ hasCompany, sidebarOpen }: Props): JSX.Element => {
  const [, setLocalProfile] = useLocalStorage<UserProfile | null>('profile', null);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={`sidebar ${sidebarOpen && 'sidebar-open'}`}>
      <div className="sidebar--menu pt-2">
        {sidebarRoutes.map((route) => {
          const isActive = (): boolean => {
            if (route.onClickAction.type === 'push' || route.onClickAction.type === 'replace') {
              return location.pathname.startsWith(route.onClickAction.payload as string);
            }

            return false;
          };

          const onClick = () => {
            if (route.onClickAction.type === 'push') {
              navigate(route.onClickAction.payload as string, { replace: false });
            } else if (route.onClickAction.type === 'replace') {
              navigate(route.onClickAction.payload as string, { replace: true });
            } else if (route.onClickAction.type === 'logout') {
              setLocalProfile(null);
              dispatch(logout());
              navigate('/login', { replace: true });
            }
          };

          return (
            <SidebarItem
              key={route.name}
              name={route.name}
              icon={route.icon}
              active={isActive()}
              disabled={!hasCompany}
              error={route.error}
              onClick={onClick}
            />
          );
        })}
      </div>
    </div>
  );
};
