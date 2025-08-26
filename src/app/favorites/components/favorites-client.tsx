"use client";

import { favoritesTable, productTable, productVariantTable } from "@/db/schema";
import ProductItem from "@/components/common/product-item";
import { EmptyState } from "./empty-state";

type FavoriteWithProduct = typeof favoritesTable.$inferSelect & {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
};

interface FavoritesClientProps {
  initialFavorites: FavoriteWithProduct[];
}

export const FavoritesClient = ({ initialFavorites }: FavoritesClientProps) => {
  if (initialFavorites.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 min-sm:max-w-[600px] min-sm:grid-cols-3 min-lg:max-w-[900px] min-lg:grid-cols-4">
      {initialFavorites.map((favorite) => (
        <ProductItem key={favorite.id} product={favorite.product} />
      ))}
    </div>
  );
};
