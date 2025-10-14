"use client";

import { productTable, productVariantTable } from "@/db/schema";
import { Button } from "../ui/button";
import { EllipsisVertical, Heart, HeartOff, Trash2 } from "lucide-react";
import { useAddFavoriteProduct } from "@/hooks/mutations/use-add-favorite-product";
import { useRemoveFavoriteProduct } from "@/hooks/mutations/use-remove-favorite-product";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useMemo, useState } from "react";
import { useFavorites } from "@/hooks/queries/use-favorites";
import { authClient } from "@/lib/auth-client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ProductItemFavoriteActionsProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  favoriteId?: string;
  isFavorite?: boolean;
}

export const ProductItemFavoriteActions = ({
  product,
  favoriteId,
  isFavorite = false,
}: ProductItemFavoriteActionsProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { data: session } = authClient.useSession();
  const { data: favorites } = useFavorites();
  const { mutate: addToFavorites, isPending: isAdding } =
    useAddFavoriteProduct();
  const { mutate: removeFromFavorites, isPending: isRemoving } =
    useRemoveFavoriteProduct();

  const isProductFavorited = useMemo(() => {
    return isFavorite
      ? true
      : !favorites
        ? false
        : favorites.some((fav) => fav.product.id === product.id);
  }, [favorites, product.id, isFavorite]);

  const currentFavoriteId = useMemo(() => {
    return isFavorite
      ? favoriteId
      : !favorites
        ? undefined
        : favorites.find((favorite) => favorite.product.id === product.id)?.id;
  }, [favorites, isFavorite, product.id, favoriteId]);

  if (!session?.user) {
    return (
      <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-100 ease-in-out group-hover:opacity-100 max-md:pointer-events-auto max-md:opacity-100 max-sm:top-2 max-sm:right-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              className="rounded-full bg-[#25252570] hover:bg-[#25252593]"
            >
              <Heart size={15} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-fit rounded-full bg-[#ffffff8c] py-2 shadow-none backdrop-blur-xl"
            side="left"
            hideWhenDetached
            sideOffset={5}
          >
            <div>
              <p className="text-sm text-[#000000a9]">Necessita estar logado</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  const handleAddToFavorites = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    isProductFavorited ? undefined : addToFavorites({ productId: product.id });
  };

  const handleRemoveFromFavorites = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    currentFavoriteId && removeFromFavorites({ id: currentFavoriteId });
  };

  if (isProductFavorited) {
    return (
      <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-100 ease-in-out group-hover:opacity-100 max-md:pointer-events-auto max-md:opacity-100 max-sm:top-2 max-sm:right-2">
        <Button
          size="icon"
          className="bg-primary rounded-full hover:bg-[#25252593]"
          onClick={handleRemoveFromFavorites}
          disabled={isRemoving}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? <HeartOff size={15} /> : <Heart size={15} />}
        </Button>
      </div>
    );
  }

  return (
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
  );
};
