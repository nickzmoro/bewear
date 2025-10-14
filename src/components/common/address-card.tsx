import { Card, CardContent } from "@/components/ui/card";
import { EllipsisVertical, Home } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ReactNode } from "react";

interface AddressCardProps {
  id: string;
  street: string;
  city: string;
  state: string;
  number: string;
  zipCode: string;
  phone: string;
  cpf: string;
  recipientName: string;
  complement: string | null;
  children: React.ReactNode;
}

const AddressCard = ({
  id,
  street,
  city,
  state,
  number,
  zipCode,
  phone,
  cpf,
  recipientName,
  complement,
  children,
}: AddressCardProps) => {
  return (
    <Card className="mt-5" key={id}>
      <CardContent className="flex justify-between gap-2">
        <div className="flex gap-4">
          <div>
            <Home size={20} />
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="text-[0.9rem] font-medium">
              {street} {number} {complement}
            </p>
            <span className="text-sm text-[#646464]">
              CEP: {zipCode} - {city}, {state}
            </span>
            <span className="text-sm text-[#646464]">
              {recipientName} - {cpf.slice(0, 3)}.{cpf.slice(3, 6)}.
              {cpf.slice(6, 9)}-{cpf.slice(9, 11)} - ({phone.slice(0, 2)}){" "}
              {phone.slice(2, 7)}-{phone.slice(7, 11)}
            </span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="h-fit rounded-full outline-0" asChild>
            <Button size="icon" variant="ghost" className="rounded-full">
              <EllipsisVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-3 p-0">
            <DropdownMenuLabel>{children}</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
