"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import {
  orderItemTable,
  orderTable,
  productVariantTable,
  shippingAddressTable,
} from "@/db/schema";
import { auth } from "@/lib/auth";

import { CreateDirectOrderSchema, createDirectOrderSchema } from "./schema";

export const createDirectOrder = async (data: CreateDirectOrderSchema) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const { productVariantId, quantity } = createDirectOrderSchema.parse(data);

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.id, productVariantId),
    with: {
      product: true,
    },
  });

  if (!productVariant) {
    throw new Error("Product variant not found");
  }

  const shippingAddress = await db.query.shippingAddressTable.findFirst({
    where: eq(shippingAddressTable.userId, session.user.id),
  });

  if (!shippingAddress) {
    throw new Error(
      "Shipping address not found. Please add a shipping address first.",
    );
  }

  const totalPriceInCents = productVariant.priceInCents * quantity;

  let orderId: string | undefined;

  await db.transaction(async (tx) => {
    const [order] = await tx
      .insert(orderTable)
      .values({
        email: shippingAddress.email,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country,
        phone: shippingAddress.phone,
        cpf: shippingAddress.cpf,
        city: shippingAddress.city,
        complement: shippingAddress.complement,
        neighborhood: shippingAddress.neighborhood,
        number: shippingAddress.number,
        recipientName: shippingAddress.recipientName,
        state: shippingAddress.state,
        street: shippingAddress.street,
        userId: session.user.id,
        totalPriceInCents,
        shippingAddressId: shippingAddress.id,
      })
      .returning();

    if (!order) {
      throw new Error("Failed to create order");
    }

    orderId = order.id;

    await tx.insert(orderItemTable).values({
      orderId: order.id,
      productVariantId,
      quantity,
      priceInCents: productVariant.priceInCents,
    });
  });

  if (!orderId) {
    throw new Error("Failed to create order");
  }

  return { orderId };
};
