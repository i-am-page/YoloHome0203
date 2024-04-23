// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'logout',
    path: '/logout',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Face Recognitiont',
  //   path: '/dashboard/products',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Check Brightness',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Check Tempurature and Humidity',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Check of Infrared for People Detection',
  //   path: '/404',
  //   icon: icon('ic_lock'),
  // },
];

export default navConfig;
