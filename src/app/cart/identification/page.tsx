import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Addresses from "./components/addresses";
import CartSummary from "../components/cart-summary";
import { Suspense } from "react";
import Loading from "./loading";
import OrderSteps from "../components/order-steps";
import Header from "@/components/common/header";

const IdentificationPage = async () => {
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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Suspense fallback={<Loading />}>
            <div className="mb-8">
              <OrderSteps hasIdentification={false} hasPayment={false} />
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="order-1">
                <Addresses
                  shippingAddresses={shippingAddresses}
                  defaultShippingAddressId={cart.shippingAddress?.id || null}
                />
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

export default IdentificationPage;
