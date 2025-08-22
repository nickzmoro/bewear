"use server";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import {
  DeleteShippingAddressSchema,
  deleteShippingAddressSchema,
} from "./schema";

export const deleteShippingAddress = async (
  data: DeleteShippingAddressSchema,
) => {
  deleteShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const shippingAddress = await db.query.shippingAddressTable.findFirst({
    where: and(
      eq(shippingAddressTable.id, data.addressId),
      eq(shippingAddressTable.userId, session.user.id),
    ),
  });

  if (!shippingAddress) {
    throw new Error("Shipping address not found or unauthorized");
  }

  await db
    .delete(shippingAddressTable)
    .where(eq(shippingAddressTable.id, data.addressId));

  return { success: true };
};
