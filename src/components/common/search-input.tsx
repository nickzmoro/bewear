import { Search } from "lucide-react";
import { Input } from "../ui/input";

const SearchInput = () => {
  return (
    <div className="relative h-auto w-1/2">
      <Input
        className="h-[50px] rounded-full px-[50px] text-sm outline-none placeholder:text-[#9A9A9A] focus-visible:border-[#00000042] focus-visible:ring-0"
        placeholder="Buscar produtos, marcas, categorias..."
      ></Input>
      <Search
        className="absolute top-[16px] left-5"
        size={18}
        color="#9A9A9A"
      />
    </div>
  );
};

export default SearchInput;
