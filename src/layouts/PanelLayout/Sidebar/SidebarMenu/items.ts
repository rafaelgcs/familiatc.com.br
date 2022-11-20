import { ReactNode } from 'react';

import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import BeachAccessTwoToneIcon from '@mui/icons-material/BeachAccessTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';
import HowToVoteTwoToneIcon from '@mui/icons-material/HowToVoteTwoTone';
import LocalPharmacyTwoToneIcon from '@mui/icons-material/LocalPharmacyTwoTone';
import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
// import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [

  {
    heading: '',
    items: [
      {
        name: 'Overview',
        link: '/panel',
        icon: DesignServicesTwoToneIcon
      }
    ]
  },
  {
    heading: 'Conteúdo',
    items: [
      {
        name: 'Produtos',
        icon: RedeemTwoToneIcon,
        link: '/panel/products',
        items: [
          {
            name: 'Listagem',
            link: '/panel/products/list'
          },
          {
            name: 'Criar Novo',
            link: '/panel/products/create'
          }
        ]
      },
    ]
  },

];

export default menuItems;
