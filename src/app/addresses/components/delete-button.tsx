import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Trash2 } from "lucide-react";
import z from "zod";

interface DeleteButtonProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
  address: z.infer<typeof shippingAddressTable>;
}

const DeleteButton = ({ shippingAddresses, address }: DeleteButtonProps) => {
  const handleDeleteAddress = async (
    address: (typeof shippingAddresses)[0],
  ) => {
    await db
      .delete(shippingAddressTable)
      .where(eq(shippingAddressTable.id, address.id));
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="flex w-full items-center justify-start gap-2 text-red-400 transition-colors duration-200 ease-in-out hover:bg-red-100 hover:text-red-400"
      onClick={() => handleDeleteAddress(address)}
    >
      <Trash2 size={15} className="text-red-400 hover:text-red-500" /> Excluir
    </Button>
  );
};

export default DeleteButton;
