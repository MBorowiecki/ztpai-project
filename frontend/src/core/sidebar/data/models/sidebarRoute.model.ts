import { type JSX } from 'react';

export interface SidebarRoute {
  name: string;
  icon: JSX.Element;
  onClickAction: OnClickAction;
  error?: boolean;
}

type OnClickActionTypes = 'push' | 'replace' | 'logout';

interface OnClickAction {
  type: OnClickActionTypes;
  payload?: string;
}
