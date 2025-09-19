import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import {
  productTable,
  productVariantTable,
  shippingAddressTable,
} from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";
import VariantSelector from "./components/variant-selector";
import AddToCartButton from "./components/add-to-cart-button";
import ProductActions from "./components/product-actions";
import { Suspense } from "react";
import Loading from "./loading";
import CategoryList from "@/components/common/category-list";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

  const categories = await db.query.categoryTable.findMany();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let shippingAddresses: (typeof shippingAddressTable.$inferSelect)[] = [];
  if (session?.user) {
    shippingAddresses = await db.query.shippingAddressTable.findMany({
      where: eq(shippingAddressTable.userId, session.user.id),
    });
  }

  return (
    <>
      <CategoryList categories={categories} />
      <Separator className="mb-5 max-sm:hidden" />
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-8 py-6">
          <Suspense fallback={<Loading />}>
            <div className="grid grid-cols-1 gap-6 min-lg:min-h-[650px] lg:grid-cols-2 lg:gap-12">
              <div className="relative aspect-square w-full rounded-3xl min-lg:aspect-auto">
                <Image
                  src={productVariant.imageUrl}
                  alt={productVariant.name}
                  fill
                  className="rounded-3xl object-cover"
                />
              </div>

              <div className="flex flex-col justify-start">
                <div className="mb-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold max-sm:text-lg min-lg:text-2xl">
                      {productVariant.product.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#656565]">
                      {productVariant.product.description}
                    </p>
                  </div>
                  <span className="text-xl font-semibold max-sm:text-lg">
                    {formatCentsToBRL(productVariant.priceInCents)}
                  </span>
                </div>

                <VariantSelector
                  variants={productVariant.product.variants}
                  selectedVariantSlug={productVariant.slug}
                />

                <div className="hidden min-sm:mt-6 min-sm:flex min-sm:flex-col min-sm:gap-6">
                  <ProductActions
                    productVariantId={productVariant.id}
                    shippingAddresses={shippingAddresses}
                  />
                </div>
              </div>
            </div>

            <div className="hidden max-sm:mt-6 max-sm:flex max-sm:flex-col max-sm:gap-6">
              <ProductActions
                productVariantId={productVariant.id}
                shippingAddresses={shippingAddresses}
              />
            </div>

            <div className="mt-8 flex flex-col gap-6">
              <div className="h-[1px] w-2/12 bg-[#00000025]"></div>
              <ProductList products={likelyProducts} title="Você pode gostar" />
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ProductVariantPage;
