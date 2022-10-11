export type OneOrganizationResponse = {
  id: number;
  uid: string;
  title: string;
  status: boolean;
  currency: string;
  amount: number;
  description: string;
  expiredMinAt: Date;
  expiredMaxAt: Date;
};

export type CreateOrUpdateInvestmentRequest = {
  investment_uuid?: number;
  uid: string;
  title: string;
  status: boolean;
  currency: string;
  amount: number;
  description: string;
  expiredMinAt: Date;
  expiredMaxAt: Date;
};
