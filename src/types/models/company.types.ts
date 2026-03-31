// export const CompanyType = {
//   SARL: "SARL",
//   SAS: "SAS",
//   SASU: "SASU",
//   EURL: "EURL",
//   EIRL: "EIRL",
//   ASSOCIATION: "ASSOCIATION",
// } as const;
// export type CompanyType = (typeof CompanyType)[keyof typeof CompanyType];

export const CompanyPotential = {
  AVAILABLE_EQUIPMENT: "AVAILABLE_EQUIPMENT",
  CONCLUSION: "CONCLUSION",
  PROJECT_STUDY: "PROJECT_STUDY",
  NEUTRAL: "NEUTRAL",
  MATERIAL_REQUEST: "MATERIAL_REQUEST",
  NEGOTIATION: "NEGOTIATION",
};
export type CompanyPotential =
  (typeof CompanyPotential)[keyof typeof CompanyPotential];

export type Company = {
  id: number;
  companyName: string;
  phoneNumber?: string;
  address?: string;
  email?: string;
  compl?: string;
  zipCode?: string;
  city?: string;
  website?: string;
  country?: string;
  siret?: string;
  vatNumber?: string;

  companyPotential: CompanyPotential;

  companyType?: { id: number; name: string };
  code?: string;
  activityDescription?: string;

  lastProspectionCall?: string;

  zohoContactId?: string;

  createdAt: string;
  updatedAt: string;
};
