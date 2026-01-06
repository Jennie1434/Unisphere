/**
 * Configuration centralisée des routes avec lazy loading
 */

import { lazy } from 'react';
import { ROUTES, SCHOOLS } from '../constants/routes';
import SchoolAuth from '../components/student/SchoolAuth';
import AdminAuth from '../components/admin/AdminAuth';

// Helper pour gérer les erreurs de chargement de chunks (version mismatch après déploiement)
const lazyLoad = (importFn) => {
  return lazy(() => {
    return importFn().catch(error => {
      // Si le module ne peut pas être chargé (souvent dû à un redéploiement), on recharge la page
      if (error.message.includes('Failed to fetch dynamically imported module') ||
        error.message.includes('Importing a module script failed')) {

        // On évite une boucle infinie avec sessionStorage
        const storageKey = `retry-lazy-refreshed`;
        if (!sessionStorage.getItem(storageKey)) {
          sessionStorage.setItem(storageKey, 'true');
          window.location.reload();
          // On renvoie une promesse qui ne résout jamais pour attendre le reload
          return new Promise(() => { });
        }
      }
      throw error;
    });
  });
};

// Nettoyage du flag de reload au chargement réussi
window.addEventListener('load', () => {
  sessionStorage.removeItem('retry-lazy-refreshed');
});

// Lazy load toutes les pages pour améliorer les performances
const UniSphereLandingPage = lazyLoad(() => import('../pages/UniSphereLandingPage'));
const SelectSchoolPage = lazyLoad(() => import('../pages/SelectSchoolPage'));
const EugeniaSchoolPage = lazyLoad(() => import('../pages/EugeniaSchoolPage'));
const AlbertSchoolPage = lazyLoad(() => import('../pages/AlbertSchoolPage'));
const EugeniaLoginPage = lazyLoad(() => import('../pages/EugeniaLoginPage'));
const AlbertLoginPage = lazyLoad(() => import('../pages/AlbertLoginPage'));
const LeaderboardPage = lazyLoad(() => import('../pages/LeaderboardPage'));
const SubmitActionPage = lazyLoad(() => import('../pages/SubmitActionPage'));
const AmbassadeursPage = lazyLoad(() => import('../pages/AmbassadeursPage'));
const AssociationsPage = lazyLoad(() => import('../pages/AssociationsPage'));
const StudentProfilePage = lazyLoad(() => import('../pages/StudentProfilePage'));
const StudentPublicProfilePage = lazyLoad(() => import('../pages/StudentPublicProfilePage'));
const ReportIssuePage = lazyLoad(() => import('../pages/ReportIssuePage'));
const AdminPage = lazyLoad(() => import('../pages/AdminPage'));
const AdminDashboard = lazyLoad(() => import('../pages/AdminDashboard'));
const AdminGuide = lazyLoad(() => import('../pages/AdminGuide'));
const ValidationQueue = lazyLoad(() => import('../components/admin/ValidationQueue'));
const ReportsQueue = lazyLoad(() => import('../components/admin/ReportsQueue'));
const ActionTypeEditor = lazyLoad(() => import('../components/admin/ActionTypeEditor'));
const LeaderboardConfig = lazyLoad(() => import('../components/admin/LeaderboardConfig'));
const AutomationConfig = lazyLoad(() => import('../components/admin/AutomationConfig'));
const LandingConfig = lazyLoad(() => import('../components/admin/LandingConfig'));
const GamificationConfig = lazyLoad(() => import('../components/admin/GamificationConfig'));
const Analytics = lazyLoad(() => import('../pages/Analytics'));
const GoogleOAuthCallback = lazyLoad(() => import('../pages/GoogleOAuthCallback'));
const GoogleSheetsSetup = lazyLoad(() => import('../pages/GoogleSheetsSetup'));
const AssociationManagementPage = lazyLoad(() => import('../pages/AssociationManagementPage'));
const CreateAssociationPage = lazyLoad(() => import('../pages/CreateAssociationPage'));
const AssociationDetailPage = lazyLoad(() => import('../pages/AssociationDetailPage'));
const NotificationsPage = lazyLoad(() => import('../pages/NotificationsPage'));
const NotFoundPage = lazyLoad(() => import('../pages/NotFoundPage'));

// Portfolio Pages
const PortfolioHome = lazyLoad(() => import('../pages/portfolio/PortfolioHome'));
const ProjectDetailsPage = lazyLoad(() => import('../pages/portfolio/ProjectDetailsPage'));
const SubmitProjectPage = lazyLoad(() => import('../pages/portfolio/SubmitProjectPage'));
const PortfolioProfilePage = lazyLoad(() => import('../pages/portfolio/StudentProfilePage'));

/**
 * Crée les routes étudiantes pour une école
 */
export function createStudentRoutes(school) {
  const schoolPath = school === SCHOOLS.EUGENIA ? '/eugenia-school' : '/albert-school';
  const LoginPage = school === SCHOOLS.EUGENIA ? EugeniaLoginPage : AlbertLoginPage;
  const SchoolPage = school === SCHOOLS.EUGENIA ? EugeniaSchoolPage : AlbertSchoolPage;

  return [
    {
      path: `${schoolPath}/login`,
      element: <LoginPage />
    },
    {
      path: `${schoolPath}`,
      element: (
        <SchoolAuth school={school}>
          <SchoolPage />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/ambassadeurs`,
      element: (
        <SchoolAuth school={school}>
          <AmbassadeursPage school={school} />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/associations`,
      element: (
        <SchoolAuth school={school}>
          <AssociationsPage school={school} />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/associations/agenda`,
      element: (
        <SchoolAuth school={school}>
          <AssociationsPage school={school} />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/associations/create`,
      element: (
        <SchoolAuth school={school}>
          <CreateAssociationPage school={school} />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/associations/:id`,
      element: (
        <SchoolAuth school={school}>
          <AssociationDetailPage school={school} />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/leaderboard`,
      element: (
        <SchoolAuth school={school}>
          <LeaderboardPage school={school} />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/submit`,
      element: (
        <SchoolAuth school={school}>
          <SubmitActionPage school={school} />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/report`,
      element: (
        <SchoolAuth school={school}>
          <ReportIssuePage school={school} />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/support`,
      element: (
        <SchoolAuth school={school}>
          <ReportIssuePage school={school} />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/portfolio`,
      element: (
        <SchoolAuth school={school}>
          <PortfolioHome school={school} />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/portfolio/project/:id`,
      element: (
        <SchoolAuth school={school}>
          <ProjectDetailsPage school={school} />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/portfolio/submit`,
      element: (
        <SchoolAuth school={school}>
          <SubmitProjectPage school={school} />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/portfolio/profile`,
      element: (
        <SchoolAuth school={school}>
          <PortfolioProfilePage school={school} />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/student/profile`,
      element: (
        <SchoolAuth school={school}>
          <StudentProfilePage school={school} />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/notifications`,
      element: (
        <SchoolAuth school={school}>
          <NotificationsPage school={school} />
        </SchoolAuth>
      )
    },
    {
      path: `${schoolPath}/association/:id/manage`,
      element: (
        <SchoolAuth school={school}>
          <AssociationManagementPage school={school} />
        </SchoolAuth>
      )
    }
  ];
}

/**
 * Crée les routes admin pour une école
 */
export function createAdminRoutes(school) {
  const schoolPath = school === SCHOOLS.EUGENIA ? '/eugenia-school' : '/albert-school';

  return [
    {
      path: `${schoolPath}/admin`,
      element: (
        <AdminAuth school={school}>
          <AdminPage school={school} />
        </AdminAuth>
      ),
      children: [
        {
          index: true,
          element: <AdminDashboard school={school} />
        },
        {
          path: 'validate',
          element: <ValidationQueue school={school} />
        },
        {
          path: 'reports',
          element: <ReportsQueue school={school} />
        },
        {
          path: 'actions',
          element: <ActionTypeEditor school={school} />
        },
        {
          path: 'leaderboard',
          element: <LeaderboardConfig school={school} />
        },
        {
          path: 'automations',
          element: <AutomationConfig school={school} />
        },
        {
          path: 'gamification',
          element: <GamificationConfig school={school} />
        },
        {
          path: 'analytics',
          element: <Analytics school={school} />
        },
        {
          path: 'google-sheets',
          element: <GoogleSheetsSetup school={school} />
        },
        {
          path: 'rewards',
          element: <LandingConfig school={school} />
        },
        {
          path: 'texts',
          element: <LandingConfig school={school} />
        },
        {
          path: 'guide',
          element: <AdminGuide school={school} />
        }
      ]
    }
  ];
}

/**
 * Routes publiques
 */
export const publicRoutes = [
  {
    path: ROUTES.HOME,
    element: <UniSphereLandingPage />
  },
  {
    path: ROUTES.SELECT_SCHOOL,
    element: <SelectSchoolPage />
  },
  {
    path: ROUTES.GOOGLE_OAUTH_CALLBACK,
    element: <GoogleOAuthCallback />
  },
  {
    path: ROUTES.PROFILE_PUBLIC,
    element: <StudentPublicProfilePage />
  }
];

/**
 * Toutes les routes combinées
 */
export function getAllRoutes() {
  return [
    ...publicRoutes,
    ...createStudentRoutes(SCHOOLS.EUGENIA),
    ...createStudentRoutes(SCHOOLS.ALBERT),
    ...createAdminRoutes(SCHOOLS.EUGENIA),
    ...createAdminRoutes(SCHOOLS.ALBERT),
    {
      path: '*',
      element: <NotFoundPage />
    }
  ];
}


