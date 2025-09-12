"use client";

import FilterCheckbox from "./filter-checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FilterContentProps {
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

const FilterContent = ({
  marks,
  categories,
  filters,
  onFilterChange,
}: FilterContentProps) => {
  return (
    <div className="flex flex-col gap-4 max-sm:gap-0">
      <Accordion type="single" collapsible defaultValue="mark">
        <AccordionItem value="mark">
          <AccordionTrigger className="items-center p-0 pb-5 text-lg font-medium hover:no-underline max-sm:text-[1rem]">
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
                  onFilterChange("marks", itemName, checked)
                }
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Separator />
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="category">
          <AccordionTrigger className="items-center text-lg font-medium hover:no-underline max-sm:text-[1rem]">
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
                  onFilterChange("categories", itemName, checked)
                }
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterContent;
