import { PATHS } from '../../../config/paths';
// import { Icon } from '../../../components/Icon/Icon';
import IconHome from '../../../assets/icons/ic_home';
import IconChat from '../../../assets/icons/ic_chat';
import IconProfile from '../../../assets/icons/ic_profile';

export default function useGetIcons(activePath: string) {
  return [
    {
      txt: 'dashboardSidebar.chats',
      icon: (
        <IconChat isActive={activePath === `/${PATHS.DASHBOARD.ROOT}/${PATHS.DASHBOARD.CHAT}`} />
      ),
      path: PATHS.DASHBOARD.CHAT,
    },
    {
      txt: 'dashboardSidebar.posts',
      icon: (
        <IconHome
          isActive={activePath === `/${PATHS.DASHBOARD.ROOT}/${PATHS.DASHBOARD.POST.LIST}`}
        />
      ),
      // icon: <Icon icon={Home} color="primary" isActive={false} />,
      path: PATHS.DASHBOARD.POST.LIST,
    },
    {
      txt: 'pofile',
      icon: (
        <IconProfile
          isActive={activePath === `/${PATHS.DASHBOARD.ROOT}/${PATHS.DASHBOARD.PROFILE}`}
        />
      ),
      // icon: <Icon icon={Home} color="primary" isActive={false} />,
      path: PATHS.DASHBOARD.PROFILE,
    },
  ];
}
