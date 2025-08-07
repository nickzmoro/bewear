import CategorySelector from "@/components/common/category-selector";
import PartnerBrandsList from "@/components/common/partner-brands-list";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import Image from "next/image";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)], // ordenar de forma decrescente (mais recente)
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <div className="space-y-9">
      <div className="px-5">
        <Image
          src="/banner-01.png"
          alt="Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
      <PartnerBrandsList title="Marcas parceiras" />
      <div className="pl-5">
        <ProductList products={products} title="Mais vendidos" />
      </div>
      <div className="px-5">
        <CategorySelector categories={categories} />
      </div>
      <div className="px-5">
        <Image
          src="/banner-02.png"
          alt="Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
      <div className="mb-10 pl-5">
        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
      </div>
    </div>
  );
}
