"use client";

import { useState, useMemo, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import CatalogPagination from "./catalog-pagination";
import DesktopSidebar from "./desktop-sidebar";
import MobileFilterHeader from "./mobile-filter-header";
import ActiveFilters from "./active-filters";
import DesktopSorting from "./desktop-sorting";
import ProductItem from "@/components/common/product-item";

interface CatalogClientProps {
  marks: any[];
  categories: any[];
  products: any[];
}

type FilterType = "marks" | "categories";

const CatalogClient = ({ marks, categories, products }: CatalogClientProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [defaultOrdering, setDefaultOrdering] = useState("Padrão");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<FilterType, string[]>>({
    marks: [],
    categories: [],
  });

  const PRODUCTS_PER_PAGE = 16;

  const handleFilterChange = (
    filterType: FilterType,
    itemName: string,
    checked: boolean,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: checked
        ? [...prev[filterType], itemName]
        : prev[filterType].filter((item) => item !== itemName),
    }));
  };

  const filterProductsByMarkAndCategory = (products: any[]) => {
    return products.filter((product) => {
      const matchesMark =
        filters.marks.length === 0 ||
        filters.marks.includes(product.mark?.name);

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category?.name);

      return matchesMark && matchesCategory;
    });
  };

  const filterProductsResult = (products: any[]) => {
    filters.marks.length === 0 && filters.categories.length === 0 && products;
    return filterProductsByMarkAndCategory(products);
  };

  const sortProductsByNewest = (sorted: any[]) => {
    sorted.sort(
      (productA: any, productB: any): number =>
        new Date(productA.createdAt).getTime() -
        new Date(productB.createdAt).getTime(),
    );
  };

  const sortProductsByLeastRecent = (sorted: any[]) => {
    sorted.sort(
      (productA: any, productB: any) =>
        productB.variants[0].priceInCents - productA.variants[0].priceInCents,
    );
  };

  const sortProductsByHighestPrice = (sorted: any[]) => {
    sorted.sort(
      (productA: any, productB: any) =>
        productB.variants[0].priceInCents - productA.variants[0].priceInCents,
    );
  };

  const sortProductsByLowestPrice = (sorted: any[]) => {
    sorted.sort(
      (productA: any, productB: any) =>
        productA.variants[0].priceInCents - productB.variants[0].priceInCents,
    );
  };

  const sortProductsByOrdering = (products: any[], ordering: string) => {
    const sorted = [...products];

    switch (ordering) {
      case "Mais recentes":
        sortProductsByNewest(sorted);
        break;
      case "Menos recentes":
        sortProductsByLeastRecent(sorted);
        break;
      case "Maior preço":
        sortProductsByHighestPrice(sorted);
        break;
      case "Menor preço":
        sortProductsByLowestPrice(sorted);
        break;
    }

    return sorted;
  };

  const getFilteredAndSortedProducts = useMemo(() => {
    const filteredProducts = filterProductsResult(products);
    return sortProductsByOrdering(filteredProducts, defaultOrdering);
  }, [products, filters, defaultOrdering]);

  const totalPages = Math.ceil(
    getFilteredAndSortedProducts.length / PRODUCTS_PER_PAGE,
  );
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = getFilteredAndSortedProducts.slice(
    startIndex,
    endIndex,
  );

  const handleProductOrdering = (orderingName: string) => {
    setDefaultOrdering(orderingName);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <>
      <Separator />
      <div className="flex h-full">
        <DesktopSidebar
          marks={marks}
          categories={categories}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <div className="flex h-full w-full items-start justify-start">
          <div className="h-full w-full 2xl:w-full">
            <MobileFilterHeader
              filters={filters}
              defaultOrdering={defaultOrdering}
              isOpenDropdown={isOpenDropdown}
              setIsOpenDropdown={setIsOpenDropdown}
              onProductOrdering={handleProductOrdering}
              marks={marks}
              categories={categories}
              onFilterChange={handleFilterChange}
            />

            <div className="my-3 px-4 2xl:hidden">
              <p className="text-muted-foreground text-sm">
                Exibindo {paginatedProducts.length} de{" "}
                {getFilteredAndSortedProducts.length} produtos...
              </p>
            </div>

            <div className="flex flex-col gap-4 px-4 py-5 max-2xl:hidden lg:px-10">
              <ActiveFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />

              <DesktopSorting
                defaultOrdering={defaultOrdering}
                isOpenDropdown={isOpenDropdown}
                setIsOpenDropdown={setIsOpenDropdown}
                onProductOrdering={handleProductOrdering}
                paginatedProductsLength={paginatedProducts.length}
                totalProductsLength={getFilteredAndSortedProducts.length}
                allProductsLength={products.length}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:px-10 2xl:grid-cols-4">
              {paginatedProducts.map((product) => (
                <ProductItem
                  product={product}
                  key={product.id}
                  showFavoriteActions
                />
              ))}
            </div>

            {getFilteredAndSortedProducts.length === 0 && (
              <div className="flex h-32 items-center justify-center px-4">
                <p className="text-center text-gray-500">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
              </div>
            )}

            <CatalogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogClient;
