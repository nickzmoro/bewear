import Link from "next/link";
import { categoryTable } from "@/db/schema";

type Category = typeof categoryTable.$inferSelect;

interface CategoryListProps {
  categories: Category[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div className="mt-2 mb-8 hidden h-auto w-full items-center justify-around px-10 min-sm:flex">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="text-sm font-medium text-[#656565] hover:text-[#474747]"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
