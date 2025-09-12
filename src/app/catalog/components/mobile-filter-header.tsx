"use client";

import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  ClockArrowDown,
  ClockArrowUp,
} from "lucide-react";
import FilterContent from "./filter-content";

interface MobileFilterHeaderProps {
  filters: {
    marks: string[];
    categories: string[];
  };
  defaultOrdering: string;
  isOpenDropdown: boolean;
  setIsOpenDropdown: (open: boolean) => void;
  onProductOrdering: (ordering: string) => void;
  marks: any[];
  categories: any[];
  onFilterChange: (
    filterType: "marks" | "categories",
    itemName: string,
    checked: boolean,
  ) => void;
}

const MobileFilterHeader = ({
  filters,
  defaultOrdering,
  isOpenDropdown,
  setIsOpenDropdown,
  onProductOrdering,
  marks,
  categories,
  onFilterChange,
}: MobileFilterHeaderProps) => {
  return (
    <div className="mx-4 flex items-center justify-between border-b py-4 2xl:hidden">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="text-md relative flex items-center gap-2 rounded-full"
            >
              <SlidersHorizontal size={16} />
              Filtros
              <Badge className="absolute top-0 right-[-3px] rounded-full bg-[#00000070] px-[6px] backdrop-blur-[5px]">
                <p className="text-[0.65rem]">
                  {filters.marks.length + filters.categories.length}
                </p>
              </Badge>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] rounded-none rounded-r-3xl px-5 sm:w-[400px]"
          >
            <SheetHeader className="p-0 pt-10">
              <SheetTitle className="flex items-center gap-2 text-xl font-semibold">
                <SlidersHorizontal size={20} absoluteStrokeWidth />
                Filtros
              </SheetTitle>
            </SheetHeader>
            <div className="mt-5">
              <FilterContent
                marks={marks}
                categories={categories}
                filters={filters}
                onFilterChange={onFilterChange}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <DropdownMenu onOpenChange={setIsOpenDropdown}>
          <DropdownMenuTrigger className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-2 text-sm">
            Ordenar por:{" "}
            <span className="max-w-[70px] truncate font-semibold">
              {defaultOrdering}
            </span>{" "}
            <ChevronDown
              size={15}
              className={`transition-transform duration-200 ${
                isOpenDropdown ? "rotate-180" : "rotate-0"
              }`}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => onProductOrdering("Mais recentes")}
            >
              <ClockArrowUp />
              Mais recentes
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onProductOrdering("Menos recentes")}
            >
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
    </div>
  );
};

export default MobileFilterHeader;
