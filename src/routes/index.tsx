import { useRoutes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import ToggleableCalendarView from "$/components/Calendar/ToggleableCalendarView/ToggleableCalendarView";
import PageWrapper from "$/guard/PageWrapper";
import MainLayout from "$/layouts/MainLayout";
import PageHeaderLayout from "$/layouts/PageHeaderLayout";
import PageLayout from "$/layouts/PageLayout";
import ClientShowPage from "$/pages/ClientPage/ClientShowPage";
import { ReportsPage } from "$/pages/ReportsPage/ReportsPage";
import { ArticleShowPage } from "$/pages/articles/ArticlePage/ArticleShowPage";
import ArticlesTablePage from "$/pages/articles/ArticlesTable/ArticlesTablePage";
import CreateArticlePage from "$/pages/articles/CreateArticle/CreateArticlePage";
import LoginPage from "$/pages/auth/login/LoginPage";
import CompanyProfileMainPage from "$/pages/companyProfile/CompanyProfileMainPage";
import CreateClientMainPage from "$/pages/createClient/CreateClientMainPage";
import { DashboardPage } from "$/pages/dashboard/DashboardPage";
import ProfilePage from "$/pages/profile/ProfilePage";
import TestSignatures from "$/pages/test/TestSignatures";

import { PATHS } from "./constants";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: (
        <PageWrapper authenticated>
          <MainLayout />
        </PageWrapper>
      ),
      children: [
        {
          path: PATHS.DASHBOARD,
          element: <PageLayout />,
          children: [
            {
              index: true,
              element: <DashboardPage />,
            },
          ],
        },
        {
          path: PATHS.CLIENTS,
          element: <PageLayout />,
          children: [
            {
              index: true,
              element: <CompanyProfileMainPage />,
            },
            {
              path: PATHS.CREATE_CLIENT,
              element: <CreateClientMainPage />,
            },
            {
              path: PATHS.CLIENT_SHOW_PAGE,
              element: <ClientShowPage />,
            },
          ],
        },
        {
          path: PATHS.ARTICLES,
          element: <PageLayout />,
          children: [
            {
              index: true,
              element: <ArticlesTablePage />,
            },
            {
              path: PATHS.CREATE_ARTICLE,
              element: <CreateArticlePage />,
            },
            {
              path: PATHS.ARTICLE_SHOW_PAGE,
              element: <ArticleShowPage />,
            },
          ],
        },
        {
          path: PATHS.CALENDAR,
          element: <PageLayout />,
          children: [
            {
              index: true,
              element: (
                <PageHeaderLayout
                  headerText="Calendrier/Tâches"
                  containerClassName="!h-full"
                >
                  <ToggleableCalendarView />
                </PageHeaderLayout>
              ),
            },
          ],
        },
        {
          path: PATHS.REPORTS,
          element: <PageLayout />,
          children: [
            {
              index: true,
              element: <ReportsPage />,
            },
          ],
        },
        {
          path: PATHS.TEST_SIGNATURES,
          element: <PageLayout />,
          children: [
            {
              index: true,
              element: <TestSignatures />,
            },
          ],
        },
        {
          path: PATHS.PROFILE,
          element: <PageLayout />,
          children: [
            {
              index: true,
              element: <ProfilePage />,
            },
          ],
        },
      ],
    },
    {
      path: PATHS.LOGIN,
      element: <LoginPage />,
    },
  ]);
};

export default Routes;
