import CategorySelector from "@/components/common/category-selector";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import Image from "next/image";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <div className="space-y-6">
      <div className="px-5">
        <Image
          src="/banner-01.png"
          alt="Leve sua vida com estilo."
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
      <ProductList products={products} title="Mais vendidos" />;
      <div className="px-5">
        <CategorySelector categories={categories} />
      </div>
      <div className="px-5">
        <Image
          src="/banner-02.png"
          alt="Leve sua vida com estilo."
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
