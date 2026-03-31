import { PATHS } from "$/routes/constants";

import { ICONS, pathsValuesLabels } from "../_constants/index.constants";
import { SidebarLink } from "../_types/index.types";

const excludeKeys: Record<"ADMIN", (keyof typeof ICONS)[]> = {
  ADMIN: [],
};

export const getSidebarLinks = (role: "ADMIN" | null): SidebarLink[] => {
  if (!role) return [];

  const keysToExclude = excludeKeys[role];

  const filteredLinks = Object.keys(ICONS)
    .filter((key) => !keysToExclude.includes(key as keyof typeof ICONS))
    .map((key) => {
      return {
        label: pathsValuesLabels[key as keyof typeof pathsValuesLabels] ?? "",
        icon: ICONS[key as keyof typeof ICONS],
        path: `${PATHS[key as keyof typeof PATHS]}`,
      };
    });

  return filteredLinks;
};
