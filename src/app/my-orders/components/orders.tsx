"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { orderTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";
import { BoxIcon, Loader2 } from "lucide-react";
import { createCheckoutSession } from "@/actions/create-checkout-session";
import { EmptyState } from "@/components/common/empty-state";
import Link from "next/link";

interface OrdersProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: (typeof orderTable.$inferSelect)["status"];
    createdAt: Date;
    items: Array<{
      id: string;
      imageUrl: string;
      productName: string;
      productVariantName: string;
      priceInCents: number;
      quantity: number;
    }>;
    recipientName: string;
    street: string;
    number: string;
    city: string;
    state: string;
    country: string;
    neighborhood: string;
    zipCode: string;
    cpf: string;
  }>;
}

const Orders = ({ orders }: OrdersProps) => {
  const router = useRouter();
  const { data: cart } = useCart();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleCheckout = async (orderId: string) => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key is not set");
    }

    setIsLoading(orderId);

    try {
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
      console.error("Erro ao criar sessão de checkout:", error);
      setIsLoading(null);
    }
  };

  return (
    <div className="mt-3">
      <h2 className="flex items-center gap-2 text-xl font-semibold min-sm:text-2xl">
        Meus pedidos
      </h2>
      <div className="mt-3 h-[1px] w-2/12 bg-[#00000025]"></div>

      {orders.length < 1 && (
        <>
          <EmptyState
            imageSrc="/illustration-emptyOrders.svg"
            imageAlt="ilustração-favoritos"
            title="Nenhum pedido encontrado"
            description="Parece que você ainda não fez nenhum pedido. Explore nossos itens e comece agora mesmo."
            classNameImage="w-[280px] max-sm:!w-[240px]"
          />
          <div className="mt-5 flex items-center justify-center">
            <Button className="w-60 rounded-full" asChild>
              <Link href="/catalog">Explorar produtos</Link>
            </Button>
          </div>
        </>
      )}

      <div className="mt-7">
        {orders.map((order) => (
          <Card key={order.id} className="mb-5">
            <CardContent className="p-0">
              <Accordion type="single" collapsible key={order.id}>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-6 py-0 hover:no-underline">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex flex-col-reverse gap-3">
                        <p className="text-sm font-semibold text-gray-800">
                          Pedido #{order.id.slice(0, 4).toLocaleUpperCase()}
                        </p>
                        {order.status === "paid" && (
                          <Badge className="rounded-full bg-green-100 text-green-800 hover:bg-green-100">
                            Pago
                          </Badge>
                        )}
                        {order.status === "pending" && (
                          <Badge
                            variant="outline"
                            className="rounded-full bg-gray-100 text-gray-700"
                          >
                            Pendente
                          </Badge>
                        )}
                        {order.status === "canceled" && (
                          <Badge variant="destructive" className="rounded-full">
                            Cancelado
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-[0.8rem] text-gray-600">
                            {order.createdAt.toLocaleDateString("pt-BR")}
                          </p>
                          <p className="text-[0.8rem] font-bold text-gray-800">
                            {formatCentsToBRL(order.totalPriceInCents)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="mt-5 px-6 pb-6">
                    <div className="space-y-4">
                      {order.items.map((product) => (
                        <div
                          className="flex items-center justify-between"
                          key={product.id}
                        >
                          <div className="flex items-center gap-4">
                            <Image
                              src={product.imageUrl}
                              alt={product.productName}
                              width={78}
                              height={78}
                              className="rounded-lg"
                            />
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-semibold text-gray-800">
                                {product.productName}
                              </p>
                              <p className="text-muted-foreground text-xs font-medium">
                                Variação: ({product.productVariantName})
                              </p>
                              <p className="text-muted-foreground text-xs font-medium">
                                {product.quantity}x
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-center gap-2">
                            <p className="text-sm font-bold text-gray-800">
                              {formatCentsToBRL(
                                product.priceInCents * product.quantity,
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="py-5">
                      <Separator />
                    </div>

                    <Card className="border-0 shadow-none">
                      <CardHeader>
                        <CardTitle className="text-base font-semibold text-gray-800">
                          Resumo
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-600">Subtotal</p>
                          <p className="text-sm font-medium text-gray-600">
                            {formatCentsToBRL(order.totalPriceInCents)}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-600">Frete</p>
                          <p className="text-sm font-medium text-purple-600">
                            Grátis
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="text-sm font-semibold text-gray-800">
                            {formatCentsToBRL(order.totalPriceInCents)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {order.status === "pending" && (
                      <div className="mt-6">
                        <Button
                          className="w-full rounded-full"
                          onClick={() => handleCheckout(order.id)}
                          disabled={isLoading === order.id}
                        >
                          {isLoading === order.id && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          {isLoading === order.id
                            ? "Processando..."
                            : "Comprar agora"}
                        </Button>
                      </div>
                    )}

                    {order.status === "paid" && (
                      <Card className="mt-5 shadow-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-800">
                            <BoxIcon size={18} /> Endereço de entrega
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1 text-gray-500">
                          <p>
                            {order.recipientName} - CPF: {order.cpf.slice(0, 3)}
                            .{order.cpf.slice(3, 6)}.{order.cpf.slice(6, 9)}-
                            {order.cpf.slice(9, 11)}
                          </p>
                          <p>
                            {order.street} {order.number}, {order.neighborhood}
                          </p>
                          <p>
                            {order.city}, {order.state} - {order.country}
                          </p>
                          <p>
                            CEP: {order.zipCode.slice(0, 5)}-
                            {order.zipCode.slice(5, 8)}
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
