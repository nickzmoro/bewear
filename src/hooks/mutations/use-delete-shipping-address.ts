import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUseShippingAddressesQueryKey } from "../queries/use-shipping-addresses";
import { deleteShippingAddress } from "@/actions/delete-shipping-address";

export const getDeleteShippingAddressMutationKey = (addressId: string) =>
  ["delete-shipping-address"] as const;

export const useDeleteShippingAddress = (addressId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getDeleteShippingAddressMutationKey(addressId),
    mutationFn: () => deleteShippingAddress({ addressId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseShippingAddressesQueryKey(),
      });
    },
  });
};
