export type RecordObj = {
  companyName: string;
  code: string;
  city: string;
  companyPotential: CompanyPotentialType;
  category: string;
  headingName: string;
  lastAction: string;
  actions: number;
};

export type TableType = {
  count: number;
  data: RecordObj[];
};

export type CompanyPotentialType = {
  label: string;
  colorClassnames: {
    textNormal: string;
    bgLight: string;
  };
};

export const companyPotentials: Record<string, CompanyPotentialType> = {
  hasMaterial: {
    label: "Dispose matériel",
    colorClassnames: {
      textNormal: "text-dark-yellow-normal",
      bgLight: "bg-dark-yellow-light",
    },
  },
  conclusion: {
    label: "Conclusion",
    colorClassnames: {
      textNormal: "text-dark-red-normal",
      bgLight: "bg-dark-red-light",
    },
  },
  projectStudy: {
    label: "Etude de projet",
    colorClassnames: {
      textNormal: "text-dark-green-normal",
      bgLight: "bg-dark-green-light",
    },
  },
  neutral: {
    label: "Neutre/Aucun",
    colorClassnames: {
      textNormal: "text-dark-gray-normal",
      bgLight: "bg-dark-gray-light",
    },
  },
  equipmentRequest: {
    label: "Demande matériel",
    colorClassnames: {
      textNormal: "text-dark-blue-normal",
      bgLight: "bg-dark-blue-light",
    },
  },
};
export default async function getAllRecords(): Promise<TableType> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        count: 100,
        data: Array.from({ length: 100 }).map((_, index) => {
          return {
            companyName: `TechCorp ${index + 1}`,
            code: `CL000${index + 1}`,
            city: `France`,
            companyPotential:
              companyPotentials[
                Object.keys(companyPotentials)[
                  Math.floor(
                    Math.random() * Object.keys(companyPotentials).length,
                  )
                ]
              ],
            category: `Site web ${index + 1}`,
            headingName: `TERRAZZO ${index + 1}`,
            lastAction: `Site web`,
            actions: index + 1,
          };
        }),
      });
    }, 1000);
  });
}
