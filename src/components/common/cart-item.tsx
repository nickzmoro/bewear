import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCentsToBRL } from "@/helpers/money";

import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProductFromCart } from "@/actions/remove-cart-product";
import { toast } from "sonner";
import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { incrementCartProductQuantity } from "@/actions/increment-cart-product-quantity";
import {
  getRemoveProductFromCartMutationKey,
  useRemoveProductFromCart,
} from "@/hooks/mutations/use-remove-product-from-cart";
import { useDecreaseCartProductQuantity } from "@/hooks/mutations/use-decrease-cart-product-quantity";
import { useIncrementCartProductQuantity } from "@/hooks/mutations/use-increment-cart-product-quantity";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);
  const decreaseCartProductQuantityMutation =
    useDecreaseCartProductQuantity(id);
  const incrementCartProductQuantityMutation =
    useIncrementCartProductQuantity(id);

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho");
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho");
      },
    });
  };

  const handleDecreaseQuantityClick = () => {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onError: () => {
        toast.error("Erro ao diminuir a quantidade do produto no carrinho");
      },
    });
  };

  const handleIncrementQuantityClick = () => {
    incrementCartProductQuantityMutation.mutate(undefined, {
      onError: () => {
        toast.error("Erro ao aumentar a quantidade do produto no carrinho");
      },
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[80px] items-center justify-between rounded-lg border p-1">
            <Button
              className="h-3 w-3"
              variant="ghost"
              onClick={handleDecreaseQuantityClick}
            >
              <MinusIcon />
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button
              className="h-3 w-3"
              variant="ghost"
              onClick={handleIncrementQuantityClick}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <Button variant="outline" size="icon" onClick={handleDeleteClick}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
