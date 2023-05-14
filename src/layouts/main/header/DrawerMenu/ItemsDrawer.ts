import { PATHS } from '../../../../config/paths';
import { getPersistData } from '../../../../utils';
interface Item {
  name: string;
  path: string | (typeof PATHS)[keyof typeof PATHS];
}
export interface ItemsType {
  [key: string]: Item;
}
export const ItemsMain = {
  home: { name: 'header.link_home', path: PATHS.MAIN.HOME },
  about: { name: 'header.link_about', path: PATHS.ABOUT },
  posts: { name: 'header.link_posts', path: PATHS.POSTS },
  contact: { name: 'header.link_contact', path: PATHS.CONTACT },
};

export const ItemsDashboard = {
  posts: {
    name: 'dashboardSidebar.posts',
    path: `/${PATHS.DASHBOARD.ROOT}/${PATHS.DASHBOARD.POST}`,
  },
  chat: {
    name: 'dashboardSidebar.chats',
    path: `/${PATHS.DASHBOARD.ROOT}/${PATHS.DASHBOARD.CHAT}`,
  },
  profile: {
    name: 'dashboardSidebar.profile',
    path: `/${PATHS.DASHBOARD.ROOT}/${PATHS.DASHBOARD.PROFILE}`,
  },
};
export const ItemsDashboardStudent = {
  favoris: {
    name: 'dashboardSidebar.favoris',
    path: `/${PATHS.DASHBOARD.ROOT}/${PATHS.DASHBOARD.FAVORIS}`,
  },
  chat: {
    name: 'dashboardSidebar.chats',
    path: `/${PATHS.DASHBOARD.ROOT}/${PATHS.DASHBOARD.CHAT}`,
  },
  profile: {
    name: 'dashboardSidebar.profile',
    path: `/${PATHS.DASHBOARD.ROOT}/${PATHS.DASHBOARD.PROFILE}`,
  },
};