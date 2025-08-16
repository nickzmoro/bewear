import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/actions/get-categories";

export const getUseCategoriesQueryKey = () => ["categories"];

export function useCategories() {
  return useQuery({
    queryKey: getUseCategoriesQueryKey(),
    queryFn: getCategories,
  });
}
