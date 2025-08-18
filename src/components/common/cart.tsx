import { ShoppingBasketIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/helpers/money";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import LogInCard from "./log-in-card";
import { useCart } from "@/hooks/queries/use-cart";
import { Badge } from "../ui/badge";

export const Cart = () => {
  const [cardUserLogin, setCardUserLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { data: session } = authClient.useSession();

  const { data: cart } = useCart();

  const handleFinishPurchase = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSheetOpen(false);
    }, 500);
  };

  return (
    <>
      {session?.user ? (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <ShoppingBasketIcon />
              <div className="absolute top-[-10px] right-[-3px] flex items-center justify-center rounded-full bg-[#181818] px-[4px] text-white">
                <Badge
                  className="w-[1px] bg-[#181818] px-[4px] text-[0.6rem] font-semibold text-white"
                  variant="secondary"
                >
                  {cart?.items?.length ?? 0}
                </Badge>
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-4/5">
            <SheetHeader>
              <SheetTitle>Carrinho</SheetTitle>
            </SheetHeader>

            <div className="flex h-full flex-col px-5 pb-5">
              <div className="flex h-full max-h-[580px] flex-col overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="flex h-full flex-col gap-8">
                    {cart?.items && cart?.items.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <ShoppingBasketIcon className="text-muted-foreground mb-4 h-12 w-12" />
                        <p className="font-medium">
                          Nenhum item no seu carrinho.
                        </p>
                        <p className="text-muted-foreground mt-1 text-sm">
                          Adicione produtos para começar suas compras!
                        </p>
                      </div>
                    )}
                    {cart?.items.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        productName={item.productVariant.product.name}
                        productVariantName={item.productVariant.name}
                        productVariantImageUrl={item.productVariant.imageUrl}
                        productVariantPriceInCents={
                          item.productVariant.priceInCents
                        }
                        quantity={item.quantity}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {cart?.items && cart?.items.length > 0 && (
                <div className="mt-5 flex flex-col gap-4">
                  <Separator />

                  <div className="flex items-center justify-between text-xs font-medium">
                    <p>Subtotal</p>
                    <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs font-medium">
                    <p>Entrega</p>
                    <p className="bg-primary rounded-full px-2 py-1 text-white">
                      GRÁTIS
                    </p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs font-medium">
                    <p>Total</p>
                    <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                  </div>

                  <Button
                    className="mt-5 rounded-full"
                    asChild={!isLoading}
                    disabled={isLoading}
                    onClick={() => {
                      handleFinishPurchase();
                    }}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processando...
                      </div>
                    ) : (
                      <Link href="/cart/identification">Finalizar compra</Link>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCardUserLogin(true)}
          >
            <ShoppingBasketIcon />
          </Button>
          {cardUserLogin && (
            <LogInCard onClick={() => setCardUserLogin(false)} />
          )}
        </>
      )}
    </>
  );
};

// SERVER ACTION
