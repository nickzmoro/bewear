"use client";

import { ChevronDown } from "lucide-react";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  ClockArrowDown,
  ClockArrowUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DesktopSortingProps {
  defaultOrdering: string;
  isOpenDropdown: boolean;
  setIsOpenDropdown: (open: boolean) => void;
  onProductOrdering: (ordering: string) => void;
  paginatedProductsLength: number;
  totalProductsLength: number;
  allProductsLength: number;
}

const DesktopSorting = ({
  defaultOrdering,
  isOpenDropdown,
  setIsOpenDropdown,
  onProductOrdering,
  paginatedProductsLength,
  totalProductsLength,
  allProductsLength,
}: DesktopSortingProps) => {
  return (
    <div className="hidden flex-col gap-4 sm:flex sm:flex-row sm:items-center sm:justify-between 2xl:flex">
      <p className="text-sm text-gray-500">
        {totalProductsLength > 0
          ? `${paginatedProductsLength} de ${totalProductsLength} produtos`
          : `${allProductsLength} produtos`}
      </p>
      <DropdownMenu onOpenChange={setIsOpenDropdown}>
        <DropdownMenuTrigger className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-2 text-sm">
          Ordenar por: <span className="font-semibold">{defaultOrdering}</span>{" "}
          <ChevronDown
            size={15}
            className={`transition-transform duration-200 ${
              isOpenDropdown ? "rotate-180" : "rotate-0"
            }`}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onProductOrdering("Mais recentes")}>
            <ClockArrowUp />
            Mais recentes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onProductOrdering("Menos recentes")}>
            <ClockArrowDown />
            Menos recentes
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onProductOrdering("Maior preço")}>
            <BanknoteArrowUp /> Maior preço
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onProductOrdering("Menor preço")}>
            <BanknoteArrowDown /> Menor preço
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DesktopSorting;
