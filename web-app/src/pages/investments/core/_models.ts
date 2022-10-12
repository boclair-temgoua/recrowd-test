export type OneInvestmentResponse = {
  id: number;
  uuid: string;
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
  title: string;
  status: boolean;
  currency: string;
  amount: number;
  description: string;
  expiredMinAt: Date;
  expiredMaxAt: Date;
};
