import { incrementCartProductQuantity } from "@/actions/increment-cart-product-quantity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUseCartQueryKey } from "../queries/use-cart";

export const getIncrementCartProductQuantityMutationKey = (
  cartItemId: string,
) => ["increment-cart-product"] as const;

export const useIncrementCartProductQuantity = (cartItemId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getIncrementCartProductQuantityMutationKey(cartItemId),
    mutationFn: () => incrementCartProductQuantity({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
