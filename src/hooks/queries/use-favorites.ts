import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "@/actions/get-favorites";

export const favoritesQueryKey = () => ["favorites"];

export const useFavorites = () => {
  return useQuery({
    queryKey: favoritesQueryKey(),
    queryFn: getFavorites,
  });
};
