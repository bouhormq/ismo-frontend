import { CompanyPotential } from "$/types/models/company.types";

export const POTENTIALS: Record<
  CompanyPotential,
  { displayText: string; bgColor: string; textColor: string }
> = {
  AVAILABLE_EQUIPMENT: {
    displayText: "Dispose matériel",
    bgColor: "bg-[#FFF280]",
    textColor: "text-[#747400]",
  },
  NEUTRAL: {
    displayText: "0. Neutre/Aucun",
    bgColor: "bg-[#E0E0E0]",
    textColor: "text-[#616161]",
  },
  MATERIAL_REQUEST: {
    displayText: "1. Demande du matériel",
    bgColor: "bg-[#A2D5FF]",
    textColor: "text-[#1565C0]",
  },
  PROJECT_STUDY: {
    displayText: "2. Etude du projet",
    bgColor: "bg-[#A0EAA3]",
    textColor: "text-[#2E7D32]",
  },
  NEGOTIATION: {
    displayText: "3. Négociation",
    bgColor: "bg-[#FCEDBF]",
    textColor: "text-[#FF8A00]",
  },
  CONCLUSION: {
    displayText: "4. Conclusion",
    bgColor: "bg-[#FFA7B0]",
    textColor: "text-[#C62828]",
  },
};

export const COMPANY_POTENTIAL_OPTIONS = [
  { value: "AVAILABLE_EQUIPMENT", label: "Dispose matériel" },
  { value: "NEUTRAL", label: "0. Neutre/Aucun" },
  { value: "MATERIAL_REQUEST", label: "1. Demande du matériel" },
  { value: "PROJECT_STUDY", label: "2. Etude du projet" },
  { value: "NEGOTIATION", label: "3. Négociation" },
  { value: "CONCLUSION", label: "4. Conclusion" },
];
