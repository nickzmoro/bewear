"use client";

import { SlidersHorizontal } from "lucide-react";
import FilterContent from "./filter-content";

interface DesktopSidebarProps {
  marks: any[];
  categories: any[];
  filters: {
    marks: string[];
    categories: string[];
  };
  onFilterChange: (
    filterType: "marks" | "categories",
    itemName: string,
    checked: boolean,
  ) => void;
}

const DesktopSidebar = ({
  marks,
  categories,
  filters,
  onFilterChange,
}: DesktopSidebarProps) => {
  return (
    <div className="sticky top-[30px] left-0 hidden h-[calc(100vh-77px)] w-fit flex-col items-start justify-start bg-white 2xl:flex">
      <div className="flex items-center gap-2 px-10 py-5">
        <SlidersHorizontal size={20} absoluteStrokeWidth />
        <p className="text-lg font-medium">Filtros</p>
      </div>
      <div className="mt-5 flex min-w-[300px] flex-col px-10">
        <FilterContent
          marks={marks}
          categories={categories}
          filters={filters}
          onFilterChange={onFilterChange}
        />
      </div>
    </div>
  );
};

export default DesktopSidebar;
