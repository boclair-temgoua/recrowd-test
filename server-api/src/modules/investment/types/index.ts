import { Investment } from '../../../models/Investment';
import { SortType } from '../../../infrastructure/utils/pagination';

export type GetInvestmentsSelections = {
  filterQuery?: any;
  data?: any[];
  option1?: {
    userId: Investment['userId'];
  };
  pagination?: {
    sort: SortType;
    page: number;
    limit: number;
  };
};

export type GetOneInvestmentSelections = {
  option1?: {
    investment_uuid: Investment['uuid'];
  };
  option2?: {
    investmentId: Investment['id'];
  };
};

export type UpdateInvestmentSelections = {
  option1?: {
    investment_uuid: Investment['uuid'];
  };
  option2?: {
    investmentId: Investment['id'];
  };
};

export type CreateInvestmentOptions = Partial<Investment>;

export type UpdateInvestmentOptions = Partial<Investment>;
