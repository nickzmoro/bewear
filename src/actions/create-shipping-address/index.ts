"use server";

import { headers } from "next/headers";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import {
  createShippingAddressSchema,
  type CreateShippingAddressSchema,
} from "./schema";
import { revalidatePath } from "next/cache";

export const createShippingAddress = async (
  data: CreateShippingAddressSchema,
) => {
  createShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [address] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientName: data.fullName,
      street: data.street,
      number: data.number,
      complement: data.complement ?? null,
      city: data.city,
      state: data.state,
      neighborhood: data.neighborhood,
      zipCode: data.zipCode,
      country: "Brasil",
      phone: data.phone,
      email: data.email,
      cpf: data.cpf,
    })
    .returning();

  revalidatePath("/cart/identification");

  return address;
};
