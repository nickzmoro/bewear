"use client";

import { favoritesTable, productTable, productVariantTable } from "@/db/schema";
import ProductItem from "@/components/common/product-item";
import { EmptyState } from "./empty-state";
import { useFavorites } from "@/hooks/queries/use-favorites";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

type FavoriteWithProduct = typeof favoritesTable.$inferSelect & {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
};

export const FavoritesClient = () => {
  const { data: favorites, isLoading, error } = useFavorites();

  if (isLoading) {
    return (
      <div className="mt-7 grid grid-cols-2 items-center justify-center gap-6 min-sm:max-w-[600px] min-sm:grid-cols-3 min-lg:max-w-[900px] min-lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-4">
            <Skeleton className="h-48 w-full rounded-3xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 text-center">
        <p className="text-red-500">Erro ao carregar favoritos</p>
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mt-7 grid grid-cols-2 items-center justify-center gap-6 min-sm:max-w-[600px] min-sm:grid-cols-3 min-lg:max-w-[900px] min-lg:grid-cols-4">
      {favorites.map((favorite) => (
        <ProductItem
          key={favorite.id}
          product={favorite.product}
          favoriteId={favorite.id}
          isFavorite={true}
          showFavoriteActions={true}
        />
      ))}
      <div className="flex aspect-square items-center justify-center">
        <Link href="/" className="bg-muted rounded-full p-2">
          <Plus size={30} color="#9e9e9e" />
        </Link>
      </div>
    </div>
  );
};
