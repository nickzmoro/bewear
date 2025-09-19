"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useProducts } from "@/hooks/queries/use-products";
import React, { useEffect, useRef, useState } from "react";
import { formatCentsToBRL } from "@/helpers/money";
import Link from "next/link";

interface SearchInputProps {
  isMobile?: boolean;
  isVisible?: boolean;
}

const SearchInput = ({
  isMobile = false,
  isVisible = true,
}: SearchInputProps) => {
  const [valueInput, setValueInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { data: products } = useProducts();

  const removeAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const searchTerm = removeAccents(valueInput);

  const handleSearchResultStrategics = (product: any, searchTerm: string) => {
    return (
      removeAccents(product.name).includes(searchTerm) ||
      removeAccents(product.mark?.name || "").includes(searchTerm) ||
      removeAccents(product.category?.name || "").includes(searchTerm)
    );
  };

  const filteredProducts = products?.filter((product) => {
    return handleSearchResultStrategics(product, searchTerm);
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValueInput(value);
    setShowResults(value.length > 0);
  };

  const handleInputFocus = () => {
    valueInput.length > 0 && setShowResults(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={searchRef}
      className={
        isMobile
          ? "relative h-auto w-full"
          : "relative hidden h-auto w-1/2 min-sm:block"
      }
    >
      <Input
        className="h-[50px] rounded-full px-[50px] text-sm outline-none placeholder:text-[#9A9A9A] focus-visible:border-[#00000042] focus-visible:ring-0"
        placeholder="Buscar produtos, marcas, categorias..."
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
      <Search
        className="absolute top-[16px] left-5"
        size={18}
        color="#9A9A9A"
      />

      {showResults && (
        <div className="absolute top-[60px] z-50 w-full rounded-2xl border bg-white p-5">
          <div
            className={`text-sm text-gray-600 ${filteredProducts?.length === 0 ? "" : "mb-3"}`}
          >
            {filteredProducts?.length} produto
            {filteredProducts?.length !== 1 ? "s" : ""} encontrado
            {filteredProducts?.length !== 1 ? "s" : ""} para "{valueInput}"
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts?.slice(0, 6).map((product) => (
              <Link
                key={product.id}
                href={`/product-variant/${product.variants[0]?.slug}`}
                className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-gray-100"
              >
                <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gray-100">
                  {product.variants[0] && (
                    <img
                      src={product.variants[0].imageUrl}
                      alt={product.name}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-medium text-gray-900">
                    {product.name}
                  </h4>
                  <p className="truncate text-xs text-gray-500">
                    {product.mark?.name} • {product.category?.name}
                  </p>
                  {product.variants[0] && (
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {formatCentsToBRL(product.variants[0].priceInCents)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
