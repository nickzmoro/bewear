import { getProducts } from "@/actions/get-products";
import { useQuery } from "@tanstack/react-query";

export const productsQueryKey = () => ["products"];

export const useProducts = () => {
  return useQuery({
    queryKey: productsQueryKey(),
    queryFn: getProducts,
  });
};
