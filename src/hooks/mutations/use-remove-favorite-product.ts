import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFavoriteProduct } from "@/actions/remove-favorite-product";
import { toast } from "sonner";

export const removeFavoriteProductMutationKey = () => [
  "remove-favorite-product",
];

export const useRemoveFavoriteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: removeFavoriteProductMutationKey(),
    mutationFn: removeFavoriteProduct,
    onSuccess: () => {
      toast.success("Produto removido dos favoritos");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao remover dos favoritos");
    },
  });
};
