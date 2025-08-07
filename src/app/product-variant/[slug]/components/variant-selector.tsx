import { Button } from "@/components/ui/button";
import { productVariantTable } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";

interface VariantSelectorProps {
  selectedVariantSlug: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

const VariantSelector = ({
  variants,
  selectedVariantSlug,
}: VariantSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          href={`/product-variant/${variant.slug}`}
          key={variant.id}
          className="rounded-xl"
        >
          <Image
            src={variant.imageUrl}
            alt={variant.name}
            width={68}
            height={68}
            className={`rounded-xl border-2 p-1 shadow-md transition-all duration-100 ease-in-out hover:shadow-lg ${selectedVariantSlug === variant.slug && "border-[#00000023]"}`}
          />
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
