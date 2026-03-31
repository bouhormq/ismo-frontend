export class PATHS {
  static readonly DASHBOARD = "/dashboard";
  static readonly CLIENTS = "/clients";
  static readonly CREATE_CLIENT = "/clients/new";
  static readonly ARTICLES = "/articles";
  static readonly CREATE_ARTICLE = "/articles/new";
  static readonly CALENDAR = "/tasks";
  static readonly LOGIN = "/login";
  static readonly CLIENT_SHOW_PAGE = "/clients/:id";
  static readonly ARTICLE_SHOW_PAGE = "/articles/:id";
  static readonly REPORTS = "/reports";
  static readonly EMAILS = "/emails";
  static readonly TEST_SIGNATURES = "/test-signatures";
  static readonly PROFILE = "/profile";
}
export type PathsKeys = keyof typeof PATHS;

export const roleDefaultRootRoutes: Record<string, string> = {
  ADMIN: PATHS.LOGIN,
};
