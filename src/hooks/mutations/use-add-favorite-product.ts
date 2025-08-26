import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavoriteProduct } from "@/actions/add-favorite-product";
import { toast } from "sonner";

export const addFavoriteProductMutationKey = () => ["add-favorite-product"];

export const useAddFavoriteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: addFavoriteProductMutationKey(),
    mutationFn: addFavoriteProduct,
    onSuccess: () => {
      toast.success("Produto adicionado aos favoritos!");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (error) => {
      toast.error(error.message || "Erro ao adicionar aos favoritos");
    },
  });
};
