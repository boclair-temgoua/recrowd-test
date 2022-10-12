import Toastify from "toastify-js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteOneInvestmentApi } from "../api/index";
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

export const DeleteInvestmentMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["investments"];
  const queryClient = useQueryClient();
  const result = useMutation(
    async ({ ...payload }: any): Promise<{ uuid: string }> => {
      const { data } = await deleteOneInvestmentApi({ ...payload });
      return data.results;
    },
    {
      onMutate: async () => {
        await queryClient.invalidateQueries(queryKey);
        await queryClient.removeQueries(queryKey);
        if (onSuccess) {
          onSuccess();
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKey);
        await queryClient.removeQueries(queryKey);
        if (onSuccess) {
          Toastify({
            text: "Investment has been deleted.",
            className: "info",
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #3CB371, #3CB371)",
            },
          }).showToast();
          onSuccess();
        }
      },
      onError: async (error) => {
        await queryClient.invalidateQueries(queryKey);
        await queryClient.removeQueries(queryKey);
        if (onError) {
          Toastify({
            text: "An error has occurred.",
            className: "info",
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            style: {
              background: "linear-gradient(to right, #FF0000, #FF0000)",
            },
          }).showToast();
          onError(error);
        }
      },
    }
  );

  return result;
};
