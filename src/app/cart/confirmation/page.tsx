import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CartSummary from "../components/cart-summary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAddress } from "../helpers/address";
import FinishOrderButton from "./components/finish-order-button";
import { Suspense } from "react";
import Loading from "./loading";
import OrderSteps from "../components/order-steps";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/common/header";

const ConfirmationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect("/");
  }
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }

  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session?.user.id),
  });

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Suspense fallback={<Loading />}>
            <div className="mb-8">
              <OrderSteps hasIdentification hasPayment={false} />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="order-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="min-sm:text-lg">Pagamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Card>
                      <CardContent className="flex flex-col items-start gap-5 min-sm:flex-row min-sm:items-center">
                        <Badge className="rounded-full bg-[#ccc] text-xs font-medium">
                          Identificação
                        </Badge>
                        <p className="text-muted-foreground text-sm">
                          {formatAddress(cart.shippingAddress)}
                        </p>
                      </CardContent>
                    </Card>
                    <FinishOrderButton />
                  </CardContent>
                </Card>
              </div>

              <div className="order-2">
                <CartSummary
                  subtotalInCents={cartTotalInCents}
                  totalInCents={cartTotalInCents}
                  products={cart.items.map((item) => ({
                    id: item.productVariant.id,
                    name: item.productVariant.product.name,
                    variantName: item.productVariant.name,
                    quantity: item.quantity,
                    priceInCents: item.productVariant.priceInCents,
                    imageUrl: item.productVariant.imageUrl,
                  }))}
                />
              </div>
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPage;
