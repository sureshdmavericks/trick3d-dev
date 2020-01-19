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
  role?: Array<number>;
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
    role: [1,2,3,4,5]
  },
  {
    name: 'Client Management',
    url: '/client-management',
    icon: 'icon-globe',
    role: [1,3]
  },
  {
    name: 'Category Management',
    url: '/category-management',
    icon: 'icon-list',
    role: [2]
  },
  {
    name: 'Usage Logs',
    url: '/usage-logs',
    icon: 'icon-list',
    role: [1]
  },
  {
    name: 'User Management',
    url: '/user-management',
    icon: 'icon-people',
    role: [1,2,3]
  },
  {
    name: 'Asset Management',
    url: '/assets',
    icon: 'icon-drawer',
    role: [1, 2, 3]
  }
];
