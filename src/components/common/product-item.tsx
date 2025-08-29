"use client";

import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";
import { ProductItemFavoriteActions } from "./product-item-favorite-actions";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
  favoriteId?: string;
  isFavorite?: boolean;
  showFavoriteActions?: boolean;
}

const ProductItem = ({
  product,
  textContainerClassName,
  favoriteId,
  isFavorite = false,
  showFavoriteActions = false,
}: ProductItemProps) => {
  const firstVariant = product.variants[0];

  return (
    <div className="group relative flex flex-col gap-4">
      <Link href={`/product-variant/${firstVariant.slug}`}>
        <Image
          src={firstVariant.imageUrl}
          alt={firstVariant.name}
          sizes="100vw"
          height={0}
          width={0}
          className="h-auto w-full rounded-3xl"
        />
        <div
          className={cn(
            "mt-4 flex max-w-[200px] flex-col gap-1",
            textContainerClassName,
          )}
        >
          <p className="truncate text-sm font-medium">{product.name}</p>
          <p className="text-muted-foreground truncate text-xs font-medium">
            {product.description}
          </p>
          <p className="mt-3 truncate text-sm font-semibold">
            {formatCentsToBRL(firstVariant.priceInCents)}
          </p>
        </div>
      </Link>

      {showFavoriteActions && (
        <ProductItemFavoriteActions
          product={product}
          favoriteId={favoriteId}
          isFavorite={isFavorite}
        />
      )}
    </div>
  );
};

export default ProductItem;