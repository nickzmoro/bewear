import CategoryList from "@/components/common/category-list";
import CategorySelector from "@/components/common/category-selector";
import PartnerBrandsList from "@/components/common/partner-brands-list";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";
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

  const categories = await db.query.categoryTable.findMany();

  return (
    <div className="space-y-9">
      <CategoryList categories={categories} />
      <div className="px-5 min-sm:px-10">
        <Image
          src="/banner-01.png"
          alt="Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full sm:hidden"
        />
        <Image
          src="/banner-01-desktop.svg"
          alt="Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vw"
          className="hidden h-auto w-full min-sm:block"
        />
      </div>
      <div className="mt-[5rem] px-5 min-sm:px-10">
        <PartnerBrandsList title="Marcas parceiras" />
      </div>
      <div className="mt-[5rem] pl-5 min-sm:pl-10">
        <ProductList products={products} title="Mais vendidos" />
      </div>
      <div className="mt-[5rem] px-5 min-sm:hidden min-sm:px-10">
        <CategorySelector categories={categories} />
      </div>
      <div className="mt-[5rem] px-5 min-sm:hidden">
        <Image
          src="/banner-02.png"
          alt="Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
      <div className="mt-[5rem] mb-10 pl-5 min-sm:pl-10">
        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
      </div>
      <div className="mt-[5rem] hidden h-auto w-full items-center justify-center gap-5 px-10 min-sm:flex">
        <div className="flex flex-col gap-5">
          <Image
            src="/banner-02-desktop.svg"
            alt="Leve uma vida com estilo"
            height={300}
            width={600}
          />
          <Image
            src="/banner-03-desktop.svg"
            alt="Leve uma vida com estilo"
            height={300}
            width={600}
          />
        </div>
        <div>
          <Image
            src="/banner-04-desktop.svg"
            alt="Leve uma vida com estilo"
            height={300}
            width={950}
          />
        </div>
      </div>
    </div>
  );
}
