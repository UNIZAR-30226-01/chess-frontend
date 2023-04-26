import {
  ArrowTopRightOnSquareIcon,
  ArrowRightOnRectangleIcon,
  PlayIcon,
  UserIcon,
  ChartBarIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import {SlBadge} from 'react-icons/Sl';
export const primaryButton = {
  name: 'Jugar partida',
  href: '/games',
  icon: PlayIcon,
};

export const navigation = [{
  name: 'Torneos',
  href: '/tournaments',
  icon: TrophyIcon,
}, {
  name: 'Clasificación',
  href: '/ranking',
  icon: ChartBarIcon,
}, {
  name: 'Logros',
  href: '/rachievemnts',
  icon: SlBadge,
}];

export const subNavigation = [{
  name: 'Perfil',
  href: '/u/username',
  icon: UserIcon,
}, { theme: true }, {
  name: 'Upgrades & FAQ',
  href: '/faq',
  icon: ArrowTopRightOnSquareIcon,
}, {
  name: 'Log out',
  icon: ArrowRightOnRectangleIcon,
  onClick: () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/sign-out`, {
      method: 'POST',
      credentials: 'include',
    })
        .then(() => window.location.href = '/auth')
        .catch(() => {});
  },
}];
