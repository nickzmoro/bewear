"use client";

import { Search, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";
import SearchInput from "./search-input";

const SearchInputMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full min-sm:hidden"
        >
          <Search size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="h-auto w-full rounded-none p-0">
        <SheetHeader className="p-5 pb-0">
          <div className="flex items-center justify-between">
            <SheetTitle>Buscar produtos</SheetTitle>
          </div>
        </SheetHeader>
        <div className="p-5">
          <SearchInput isMobile={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchInputMobile;
