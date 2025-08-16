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
  });
};
