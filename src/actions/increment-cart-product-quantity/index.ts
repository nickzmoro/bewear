"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { incrementCartProductQuantitySchema } from "./schema";
import z from "zod";

export const incrementCartProductQuantity = async (
  data: z.infer<typeof incrementCartProductQuantitySchema>,
) => {
  incrementCartProductQuantitySchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, data.cartItemId),
    with: {
      cart: true,
    },
  });

  if (!cartItem) {
    throw new Error("Product variant not found in cart");
  }
  const cartDoesNotBelongToUser = cartItem.cart.userId != session.user.id;
  if (cartDoesNotBelongToUser) {
    throw new Error("Unauthorized");
  }

  await db
    .update(cartItemTable)
    .set({ quantity: cartItem.quantity + 1 })
    .where(eq(cartItemTable.id, cartItem.id));
};
