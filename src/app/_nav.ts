interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Client Management',
    url: '/client-management',
    icon: 'icon-globe',

  },
  {
    name: 'Category Management',
    url: '/category-management',
    icon: 'icon-list',

  },
  {
    name: 'Usage Logs',
    url: '/usage-logs',
    icon: 'icon-list',

  },
  {
    name: 'User Management',
    url: '/user-management',
    icon: 'icon-people',

  },
  {
    name: 'Asset Management',
    url: '/assets',
    icon: 'icon-drawer',

  }
];
