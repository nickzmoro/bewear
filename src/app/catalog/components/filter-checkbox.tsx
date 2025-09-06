"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterCheckboxProps {
  id: string;
  name: string;
  selectedItems: string[];
  onItemChange: (itemName: string, checked: boolean) => void;
}

const FilterCheckbox = ({
  id,
  name,
  selectedItems,
  onItemChange,
}: FilterCheckboxProps) => {
  return (
    <div key={id} className="flex items-center gap-2">
      <Checkbox
        id={name}
        checked={selectedItems.includes(name)}
        onCheckedChange={(checked) => onItemChange(name, checked as boolean)}
      />
      <Label htmlFor={name} className="text-md font-normal">
        {name}
      </Label>
    </div>
  );
};

export default FilterCheckbox;
