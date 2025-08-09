import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUseCartQueryKey } from "../queries/use-cart";

export const getDecreaseCartProductQuantityMutationKey = (cartItemId: string) =>
  ["decrease-cart-product"] as const;

export const useDecreaseCartProductQuantity = (cartItemId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getDecreaseCartProductQuantityMutationKey(cartItemId),
    mutationFn: () => decreaseCartProductQuantity({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
