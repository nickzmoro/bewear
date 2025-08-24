import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";
import VariantSelector from "./components/variant-selector";
import AddToCartButton from "./components/add-to-cart-button";
import ProductActions from "./components/product-actions";
import { Suspense } from "react";
import Loading from "./loading";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <div className="flex flex-col space-y-6 px-5">
      <Suspense fallback={<Loading />}>
        <div className="relative h-[380px] w-full rounded-3xl">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            fill
            className="rounded-3xl object-cover"
          />
        </div>

        <div>
          <div className="mb-5 flex flex-col gap-4">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">
                {productVariant.product.name}
              </h3>
              <p className="text-sm text-[#656565]">
                {productVariant.product.description}
              </p>
            </div>
            <span className="font-semibold">
              {formatCentsToBRL(productVariant.priceInCents)}
            </span>
          </div>

          {/* VARIANTES */}
          <p className="mb-3 text-sm font-medium">
            Selecionar variação{" "}
            <span className="text-primary">- {productVariant.name}</span>
          </p>
          <VariantSelector
            variants={productVariant.product.variants}
            selectedVariantSlug={productVariant.slug}
          />
        </div>

        <ProductActions productVariantId={productVariant.id} />

        <div>
          {/* DESCRIÇÃO DO PRODUTO */}
          <p className="text-sm">{productVariant.product.description}</p>
        </div>

        <div className="mb-10 flex flex-col gap-5">
          <div className="h-[1px] w-full bg-[#0000005d]"></div>
          <ProductList
            products={likelyProducts}
            title="Você também pode gostar"
          />
        </div>
      </Suspense>
    </div>
  );
};

export default ProductVariantPage;
