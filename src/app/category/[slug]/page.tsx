import { db } from "@/db";
import { eq } from "drizzle-orm";
import { categoryTable, productTable } from "@/db/schema";
import { notFound } from "next/navigation";
import ProductItem from "@/components/common/product-item";
import { Suspense } from "react";
import Loading from "./loading";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });
  if (!category) {
    return notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });
  if (!products) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="mt-5 space-y-6 px-5 min-sm:px-10">
        <Suspense fallback={<Loading />}>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold min-sm:text-xl min-lg:text-2xl">
              {category.name}
            </h3>
            <div className="h-[1px] w-full bg-[#00000013]"></div>
          </div>
          <div className="mb-10 grid grid-cols-2 gap-3 space-y-5 min-sm:grid-cols-3 min-lg:grid-cols-4">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                textContainerClassName="max-w-full"
                showFavoriteActions={true}
              />
            ))}
          </div>
        </Suspense>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </>
  );
};

export default CategoryPage;
