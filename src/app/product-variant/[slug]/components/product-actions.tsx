"use client";

import {
  MinusIcon,
  PlusIcon,
  Loader2,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/actions/create-checkout-session";
import { useCreateDirectOrder } from "@/hooks/mutations/use-create-direct-order";

import AddToCartButton from "./add-to-cart-button";
import { useUserAddresses } from "@/hooks/queries/use-shipping-addresses";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const createDirectOrderMutation = useCreateDirectOrder();
  const { data: shippingAddresses, isLoading: isLoadingAddresses } =
    useUserAddresses();

  const hasShippingAddresses =
    shippingAddresses && shippingAddresses.length > 0;

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleAddAddress = () => {
    router.push("/cart/identification");
  };

  const handleBuyNow = async () => {
    if (!hasShippingAddresses) {
      toast.error("Você precisa cadastrar um endereço de entrega primeiro.", {
        action: {
          label: "Adicionar endereço",
          onClick: handleAddAddress,
        },
      });
      return;
    }

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      toast.error("Erro de configuração do sistema");
      return;
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
        toast.error("Erro ao carregar o sistema de pagamento");
        return;
      }

      await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Shipping address not found")) {
          toast.error(
            "Endereço de entrega não encontrado. Por favor, cadastre um endereço primeiro.",
            {
              action: {
                label: "Adicionar endereço",
                onClick: handleAddAddress,
              },
            },
          );
        } else {
          toast.error("Erro ao processar o pedido. Tente novamente.");
        }
      } else {
        toast.error("Erro inesperado. Tente novamente.");
      }
    }
  };

  if (isLoadingAddresses) {
    return (
      <div className="space-y-4">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

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
      <div className="flex flex-col space-y-2">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />

        {hasShippingAddresses ? (
          <Button
            className="rounded-full"
            size="lg"
            onClick={handleBuyNow}
            disabled={
              createDirectOrderMutation.isPending || !hasShippingAddresses
            }
          >
            {createDirectOrderMutation.isPending && (
              <Loader2 className="animate-spulse mr-2 h-4 w-4" />
            )}
            {createDirectOrderMutation.isPending
              ? "Processando..."
              : "Comprar agora"}
          </Button>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button className="rounded-full" size="lg">
                Comprar agora
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 border border-red-400 bg-red-50 shadow-none">
              <div className="flex justify-between gap-3">
                <AlertTriangle size={25} color="#f87171" />
                <p className="text-sm text-red-400">
                  Você precisa de um endereço para comprar agora.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </>
  );
};

export default ProductActions;
