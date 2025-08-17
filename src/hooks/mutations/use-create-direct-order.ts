import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createDirectOrder } from "@/actions/create-direct-order";

export const createDirectOrderMutationKey = () =>
  ["create-direct-order"] as const;

export const useCreateDirectOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: createDirectOrderMutationKey(),
    mutationFn: createDirectOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: Error) => {
      if (error.message.includes("Shipping address not found")) {
        return { type: "no-address", message: error.message };
      }
      return { type: "general", message: error.message };
    },
  });
};
