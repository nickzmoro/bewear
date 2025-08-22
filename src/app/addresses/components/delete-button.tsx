"use client";

import { Button } from "@/components/ui/button";
import { useDeleteShippingAddress } from "@/hooks/mutations/use-delete-shipping-address";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteButtonProps {
  addressId: string;
}

const DeleteButton = ({ addressId }: DeleteButtonProps) => {
  const deleteShippingAddressMutation = useDeleteShippingAddress(addressId);

  const handleDeleteShippingAddress = () => {
    deleteShippingAddressMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Endereço removido com sucesso!");
      },
      onError: () => {
        toast.error(
          "Endereço não removido, pois você tem um pedido com esse endereço!",
        );
      },
    });
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="flex w-full items-center justify-start gap-2 text-red-400 transition-colors duration-200 ease-in-out hover:bg-red-100 hover:text-red-400"
      onClick={handleDeleteShippingAddress}
      disabled={deleteShippingAddressMutation.isPending}
    >
      <Trash2 size={15} className="text-red-400 hover:text-red-500" />
      {deleteShippingAddressMutation.isPending ? "Excluindo..." : "Excluir"}
    </Button>
  );
};

export default DeleteButton;
