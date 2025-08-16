"use client";

import { MinusIcon, PlusIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/actions/create-checkout-session";
import { useCreateDirectOrder } from "@/hooks/mutations/use-create-direct-order";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const createDirectOrderMutation = useCreateDirectOrder();

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleBuyNow = async () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key is not set");
    }

    try {
      const { orderId } = await createDirectOrderMutation.mutateAsync({
        productVariantId,
        quantity,
      });

      const checkoutSession = await createCheckoutSession({
        orderId,
      });

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );

      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });
    } catch (error) {
      console.error("Erro ao criar pedido direto:", error);
    }
  };

  return (
    <>
      <div>
        <div className="space-y-4">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-[100px] items-center justify-between rounded-lg border">
            <Button size="icon" variant="ghost" onClick={handleDecrement}>
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button size="icon" variant="ghost" onClick={handleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <Button
          className="rounded-full"
          size="lg"
          onClick={handleBuyNow}
          disabled={createDirectOrderMutation.isPending}
        >
          {createDirectOrderMutation.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {createDirectOrderMutation.isPending
            ? "Processando..."
            : "Comprar agora"}
        </Button>
      </div>
    </>
  );
};

export default ProductActions;
