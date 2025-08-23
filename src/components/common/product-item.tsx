import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
}

const ProductItem = ({ product, textContainerClassName }: ProductItemProps) => {
  const firstVariant = product.variants[0];
  return (
    <div className="group">
      <Link
        href={`/product-variant/${firstVariant.slug}`}
        className="flex flex-col gap-4"
      >
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
            "flex max-w-[200px] flex-col gap-1",
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
      <div className="pointer-events-none absolute top-3 right-3 z-99 opacity-0 transition-opacity duration-100 ease-in-out group-hover:pointer-events-auto group-hover:opacity-100">
        <Button size="icon" className="bg-black">
          <Heart />
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
