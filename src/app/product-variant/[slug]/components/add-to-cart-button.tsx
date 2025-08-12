"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCard", productVariantId, quantity],
    mutationFn: () => addProductToCart({ productVariantId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
        exact: false,
      });
      toast.success(`Você adicionou ${quantity}x produto(s) no carrinho!`);
    },
    onError: (error) => {
      console.error("Erro ao adicionar produto:", error);
      toast.error("Erro ao adicionar produto ao carrinho!");
    },
  });

  const handleAddToCart = () => {
    if (!session?.user) {
      toast.error("Faça login para adicionar produtos ao carrinho!");
      router.push("/authentication");
      return;
    }

    console.log("Adicionando produto para usuário:", session.user.id); // Debug
    mutate();
  };

  return (
    <Button
      className="rounded-full"
      size="lg"
      variant="outline"
      disabled={isPending}
      onClick={handleAddToCart}
    >
      {isPending && <Loader2 className="animate-spin" />}
      Adicionar à sacola
    </Button>
  );
};

export default AddToCartButton;
