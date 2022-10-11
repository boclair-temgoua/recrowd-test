import dyaxios from "../../../utils/dyaxios";
import { CreateOrUpdateInvestmentRequest } from "../core/_models";

export const getOneInvestmentApi = (options: { investment_uuid: string }) => {
  const { investment_uuid } = options;
  return dyaxios.get<{ investment_uuid: string }>(
    `/investments/show/${investment_uuid}`
  );
};

export const createOneInvestmentApi = (payload: any) => {
  return dyaxios.post<any>(`/investments/create`, payload);
};

export const updateOneInvestmentApi = (
  payload: CreateOrUpdateInvestmentRequest
) => {
  return dyaxios.put(`/investment/update/${payload?.investment_uuid}`, payload);
};

export const deleteOneInvestmentApi = (
  payload: CreateOrUpdateInvestmentRequest
) => {
  return dyaxios.delete(`/investment/update/${payload?.investment_uuid}`);
};
