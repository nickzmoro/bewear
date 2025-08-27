import Image from "next/image";
import Link from "next/link";

import { favoritesTable, productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { EllipsisVertical, Heart, Trash2 } from "lucide-react";
import { useAddFavoriteProduct } from "@/hooks/mutations/use-add-favorite-product";
import { useRemoveFavoriteProduct } from "@/hooks/mutations/use-remove-favorite-product";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
  favoriteId?: string;
  isFavorite?: boolean;
}

const ProductItem = ({
  product,
  textContainerClassName,
  favoriteId,
  isFavorite = false,
}: ProductItemProps) => {
  const firstVariant = product.variants[0];
  const { mutate: addToFavorites, isPending: isAdding } =
    useAddFavoriteProduct();
  const { mutate: removeFromFavorites, isPending: isRemoving } =
    useRemoveFavoriteProduct();

  const query = useQueryClient();

  const handleAddToFavorites = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addToFavorites({ productId: product.id });
  };

  const handleRemoveFromFavorites = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (favoriteId) {
      removeFromFavorites({ id: favoriteId });
      query.invalidateQueries({ queryKey: ["favorites"] });
    }
  };

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

      {!isFavorite ? (
        <div className="pointer-events-none absolute top-3 right-3 opacity-0 transition-opacity duration-100 ease-in-out group-hover:pointer-events-auto group-hover:opacity-100 max-md:pointer-events-auto max-md:opacity-100 max-sm:top-2 max-sm:right-2">
          <Button
            size="icon"
            className="hover:bg-primary rounded-full bg-[#252525]"
            onClick={handleAddToFavorites}
            disabled={isAdding}
          >
            <Heart className={isAdding ? "animate-pulse" : ""} />
          </Button>
        </div>
      ) : (
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <EllipsisVertical color="#000" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-3">
              <DropdownMenuLabel
                asChild
                className="flex w-full items-center justify-start gap-2 text-red-400 transition-colors duration-200 ease-in-out hover:bg-red-100 hover:text-red-400"
              >
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleRemoveFromFavorites}
                  disabled={isRemoving}
                >
                  <Trash2
                    size={15}
                    className="text-red-400 hover:text-red-500"
                  />
                  {isRemoving ? "Excluindo.." : "Excluir"}
                </Button>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
