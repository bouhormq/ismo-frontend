export type Article = {
  id: number;
  title: string;
  description?: string;
  catalogDescription?: string;
  reference: string;
  equipmentCondition?: string;
  availability?: string;

  isCompleted: boolean;
  showOnWebsite: boolean;

  companyId: number;

  purchasePriceWithoutTVA: number;
  purchasePriceWithTVA: number;
  HSCode: string;
  marginRate: number;
  sellingPriceWithoutTVA: number;
  sellingPriceWithTVA: number;

  createdAt: string;
  updatedAt: string;
};
