import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';

import PanelLayout from 'src/layouts/PanelLayout';
// import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import LandingLayout from './layouts/LandingLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

import { panel as authPanel } from 'src/services/auth';

const Loader = (Component) => (props) =>
(
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Landing Page

const LandingPage = Loader(
  lazy(() => import('src/content/landing/LandingPage'))
);

// AUTHs

const PanelAuthenticatedPage = ({ component: Component, initial }) =>
  authPanel.panelIsAuthenticated() ? (
    <>
      <Component />
    </>
  ) : (
    <Navigate to={{ pathname: `/${initial}/login` }} />
  );

// Panel

const LoginPanel = Loader(
  lazy(() => import('src/content/panel/auth_pages/Login'))
);
const PanelHomePage = Loader(
  lazy(() => import('src/content/panel/pages/HomePage'))
);
const PanelProductList = Loader(
  lazy(() => import('src/content/panel/pages/Products/List'))
);
const PanelProductCreate = Loader(
  lazy(() => import('src/content/panel/pages/Products/Create'))
);
const PanelUserProfilePage = Loader(
  lazy(() => import('src/content/panel/pages/Profile'))
);

// Dashboards

const Tasks = Loader(lazy(() => import('src/content/dashboards/Tasks')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

// Status Panel
const Status404Panel = Loader(
  lazy(() => import('src/content/pages/Status/Status404Panel'))
);


const routes_temp: PartialRouteObject[] = [
  // Website
  {
    path: '*',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'panel',
    element: <PanelLayout />,
    children: [
      {
        path: '/',
        element: <PanelHomePage />
        // element: (
        // <PanelAuthenticatedPage component={PanelHomePage} initial={'panel'} />
        // )
      },
      {
        path: 'login',
        element: <Navigate to="/login/panel" replace />
      },
      {
        path: 'profile',
        children: [
          {
            path: '/',
            element: <Navigate to="/profile/details" replace />
          },
          {
            path: 'details',
            element: (
              <PanelAuthenticatedPage
                component={PanelUserProfilePage}
                initial={'panel'}
              />
            )
          }
        ]
      },
      {
        path: 'tasks',
        element: <PanelAuthenticatedPage component={Tasks} initial={'panel'} />
      },
      {
        path: 'messenger',
        element: (
          <PanelAuthenticatedPage component={Messenger} initial={'panel'} />
        )
      },
      {
        path: 'transactions',
        element: (
          <PanelAuthenticatedPage component={Transactions} initial={'panel'} />
        )
      }
    ]
  },
  {
    path: 'login',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/" replace />
      },
      {
        path: 'panel',
        element: <LoginPanel />
      }
    ]
  }
];

const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: <LandingLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '*',
        element: <StatusMaintenance />
      }
    ]
  },
  {
    path: '/panel',
    element: <PanelLayout />,
    children: [
      {
        path: '/',
        element: (
          <PanelAuthenticatedPage component={PanelHomePage} initial={'panel'} />
        )
      },
      {
        path: '/products/list',
        element: (
          <PanelAuthenticatedPage component={PanelProductList} initial={'panel'} />
        )
      },
      {
        path: '/products/create',
        element: (
          <PanelAuthenticatedPage component={PanelProductCreate} initial={'panel'} />
        )
      },
      {
        path: 'tasks',
        element: <PanelAuthenticatedPage component={Tasks} initial={'panel'} />
      },
      {
        path: 'messenger',
        element: (
          <PanelAuthenticatedPage component={Messenger} initial={'panel'} />
        )
      },
      {
        path: 'transactions',
        element: (
          <PanelAuthenticatedPage component={Transactions} initial={'panel'} />
        )
      },
      {
        path: '/login',
        element: <Navigate to={'/auth/login'} replace />
      },
      {
        path: '*',
        element: <Status404Panel />
      }
    ]
  },
  {
    path: '/auth',
    element: <BaseLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPanel />
      }
    ]
  }
];
export default routes;
