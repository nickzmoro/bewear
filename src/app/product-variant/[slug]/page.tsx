import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";
import VariantSelector from "./components/variant-selector";

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
      <div className="relative h-[380px] w-full rounded-3xl">
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          fill
          className="rounded-3xl object-cover"
        />
      </div>

      <div>
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

      <div>
        {/* INFORMAÇÕES DO PRODUTO */}
        <h2 className="text-lg font-semibold">{productVariant.product.name}</h2>
        <h3 className="text-muted-foreground text-sm">{productVariant.name}</h3>
        <h3 className="mt-3 text-lg font-semibold">
          {formatCentsToBRL(productVariant.priceInCents)}
        </h3>
      </div>

      <div>{/* QUANTIDADE */}</div>

      <div className="flex flex-col space-y-3">
        {/* BOTÕES */}
        <Button className="rounded-full" variant="outline">
          Adicionar à sacola
        </Button>
        <Button className="rounded-full" size="lg">
          Comprar agora
        </Button>
      </div>

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
    </div>
  );
};

export default ProductVariantPage;
