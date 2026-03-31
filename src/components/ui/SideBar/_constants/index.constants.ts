import { PathsKeys } from "$/routes/constants";

// Gestion des interventions
export const ICONS: Partial<Record<PathsKeys, string>> = {
  DASHBOARD: "DASHBOARD",
  CLIENTS: "CLIENTS",
  ARTICLES: "ARTICLES",
  CALENDAR: "CALENDAR",
  REPORTS: "REPORTS",
  EMAILS: "EMAILS",
} as const;

export type ICONS = (typeof ICONS)[keyof typeof ICONS];

export const pathsValuesLabels: Partial<Record<keyof typeof ICONS, string>> = {
  DASHBOARD: "Tableau de bord",
  CLIENTS: "Fiche société",
  ARTICLES: "Article",
  CALENDAR: "Calendrier/Tâches",
  REPORTS: " Exportation et rapports",
};
