"use client";

import { X, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface ActiveFiltersProps {
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

const ActiveFilters = ({ filters, onFilterChange }: ActiveFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.marks.map((markName) => (
        <Badge
          key={`mark-${markName}`}
          variant="outline"
          className="rounded-full px-3 py-2 text-sm"
        >
          {markName}
          <HoverCard>
            <HoverCardTrigger className="flex items-center justify-center">
              <Button
                size={"icon"}
                variant="ghost"
                onClick={() => {
                  onFilterChange("marks", markName, false);
                }}
                className="h-4 w-4"
              >
                <X />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent
              className="flex w-fit items-center gap-2 px-1 py-1"
              side="top"
            >
              <Trash2 size={14} color="#30303075" />
            </HoverCardContent>
          </HoverCard>
        </Badge>
      ))}
      {filters.categories.map((categoryName) => (
        <Badge
          key={`category-${categoryName}`}
          variant="outline"
          className="rounded-full px-3 py-2 text-sm"
        >
          {categoryName}
          <HoverCard>
            <HoverCardTrigger className="flex items-center justify-center">
              <Button
                size={"icon"}
                variant="ghost"
                onClick={() => {
                  onFilterChange("categories", categoryName, false);
                }}
                className="h-4 w-4"
              >
                <X />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent
              className="flex w-fit items-center gap-2 px-3 py-1"
              side="top"
            >
              <Trash2 size={14} color="#ff000075" />
              <p className="text-muted-foreground text-sm select-none">
                Excluir
              </p>
            </HoverCardContent>
          </HoverCard>
        </Badge>
      ))}
    </div>
  );
};

export default ActiveFilters;
