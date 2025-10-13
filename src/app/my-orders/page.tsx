import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import Orders from "./components/orders";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

const MyOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/authentication");
  }
  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session?.user.id),
    with: {
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

  return (
    <div className="flex h-screen flex-col justify-between">
      <Header />
      <div className="mt-2 flex flex-col px-5 min-sm:items-center min-sm:justify-center min-sm:px-0">
        <div className="min-sm:min-w-[600px] min-lg:min-w-[900px]">
          <Orders
            orders={orders.map((order) => ({
              id: order.id,
              totalPriceInCents: order.totalPriceInCents,
              status: order.status,
              createdAt: order.createdAt,
              recipientName: order.recipientName,
              street: order.street,
              number: order.number,
              city: order.city,
              state: order.state,
              country: order.country,
              neighborhood: order.neighborhood,
              cpf: order.cpf,
              zipCode: order.zipCode,
              items: order.items.map((item) => ({
                id: item.id,
                imageUrl: item.productVariant.imageUrl,
                productName: item.productVariant.product.name,
                productVariantName: item.productVariant.name,
                priceInCents: item.productVariant.priceInCents,
                quantity: item.quantity,
              })),
            }))}
          />
        </div>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default MyOrdersPage;
