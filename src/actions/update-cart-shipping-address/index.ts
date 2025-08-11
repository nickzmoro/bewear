"use server";

import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { cartTable, shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import {
  updateCartShippingAddressSchema,
  type UpdateCartShippingAddressSchema,
} from "./schema";

export const updateCartShippingAddress = async (
  data: UpdateCartShippingAddressSchema,
) => {
  updateCartShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const address = await db.query.shippingAddressTable.findFirst({
    where: (addr, { eq }) => eq(addr.id, data.shippingAddressId),
  });
  if (!address || address.userId !== session.user.id) {
    throw new Error("Shipping address not found");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });

  let cartId = cart?.id;
  if (!cartId) {
    const [newCart] = await db
      .insert(cartTable)
      .values({ userId: session.user.id })
      .returning();
    cartId = newCart.id;
  }

  await db
    .update(cartTable)
    .set({ shippingAddressId: data.shippingAddressId })
    .where(eq(cartTable.id, cartId));
};
