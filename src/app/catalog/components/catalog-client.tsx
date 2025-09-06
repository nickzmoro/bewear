"use client";

import { useState } from "react";
import FilterCheckbox from "./filter-checkbox";
import { Separator } from "@/components/ui/separator";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  ChevronDown,
  ClockArrowDown,
  ClockArrowUp,
  FilterIcon,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/common/product-item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CatalogClientProps {
  marks: any[];
  categories: any[];
  products: any[];
}

type FilterType = "marks" | "categories";

const CatalogClient = ({ marks, categories, products }: CatalogClientProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [defaultOrdening, setDefaultOrdening] = useState("Padrão");
  const [filters, setFilters] = useState<Record<FilterType, string[]>>({
    marks: [],
    categories: [],
  });

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

  const getFilteredProducts = () => {
    if (filters.marks.length === 0 && filters.categories.length === 0) {
      return products;
    }

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

  const filteredProducts = getFilteredProducts();

  return (
    <>
      <Separator />
      <div className="flex">
        <div className="border-r-[oklch(0.92 0.004 286.32)] absolute top-[77px] left-0 flex h-full w-fit flex-col items-start justify-start border-r bg-white">
          <div className="flex items-center gap-2 px-10 py-5">
            <SlidersHorizontal size={20} absoluteStrokeWidth />
            <p className="text-lg font-medium">Filtrar</p>
          </div>
          <Separator />
          <div className="mt-5 flex min-w-[300px] flex-col px-10">
            <Accordion type="single" collapsible defaultValue="mark">
              <AccordionItem value="mark">
                <AccordionTrigger className="items-center p-0 pb-5 text-lg font-medium hover:no-underline">
                  Marcas
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  {marks?.map((mark) => (
                    <FilterCheckbox
                      key={mark.id}
                      id={mark.id}
                      name={mark.name}
                      selectedItems={filters.marks}
                      onItemChange={(itemName, checked) =>
                        handleFilterChange("marks", itemName, checked)
                      }
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Separator />

            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="category">
                <AccordionTrigger className="items-center text-lg font-medium hover:no-underline">
                  Categorias
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  {categories?.map((category) => (
                    <FilterCheckbox
                      key={category.id}
                      id={category.id}
                      name={category.name}
                      selectedItems={filters.categories}
                      onItemChange={(itemName, checked) =>
                        handleFilterChange("categories", itemName, checked)
                      }
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="flex h-full w-full items-start justify-end">
          <div className="h-full w-10/12">
            <div className="flex items-center justify-between px-10 py-5">
              <div className="flex flex-wrap gap-2">
                {filters.marks.map((markName) => (
                  <Badge
                    key={`mark-${markName}`}
                    variant="outline"
                    className="rounded-full px-3 py-2 text-sm"
                  >
                    {markName}
                    <X />
                  </Badge>
                ))}
                {filters.categories.map((categoryName) => (
                  <Badge
                    key={`category-${categoryName}`}
                    variant="outline"
                    className="rounded-full px-3 py-2 text-sm"
                  >
                    {categoryName}
                    <X />
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-500">
                  {filteredProducts.length > 0
                    ? `${filteredProducts.length} produtos`
                    : `${products.length}`}
                </p>
                <DropdownMenu onOpenChange={setIsOpenDropdown}>
                  <DropdownMenuTrigger className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-2 text-sm">
                    Ordenar por:{" "}
                    <span className="font-semibold">{defaultOrdening}</span>{" "}
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${
                        isOpenDropdown ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => setDefaultOrdening("Mais recente")}
                    >
                      <ClockArrowUp />
                      Mais recente
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDefaultOrdening("Menos recente")}
                    >
                      <ClockArrowDown />
                      Menos recente
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDefaultOrdening("Maior preço")}
                    >
                      <BanknoteArrowUp /> Maior preço
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDefaultOrdening("Menor preço")}
                    >
                      <BanknoteArrowDown /> Menor preço
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 px-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductItem
                  product={product}
                  key={product.id}
                  showFavoriteActions
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="flex h-32 items-center justify-center">
                <p className="text-gray-500">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogClient;
