"use server";

import { db } from "@/db";
import { favoritesTable, productTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AddFavoriteProductSchema, addFavoriteProductSchema } from "./schema";
import { eq, and } from "drizzle-orm";

export const addFavoriteProduct = async (data: AddFavoriteProductSchema) => {
  addFavoriteProductSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Crie sua conta para prosseguir");
  }

  const product = await db.query.productTable.findFirst({
    where: eq(productTable.id, data.productId),
  });

  if (!product) {
    throw new Error("Produto não existe");
  }

  const existingFavorite = await db.query.favoritesTable.findFirst({
    where: and(
      eq(favoritesTable.userId, session.user.id),
      eq(favoritesTable.productId, data.productId),
    ),
  });

  if (existingFavorite) {
    throw new Error("Produto já existe nos favoritos!");
  }

  await db.insert(favoritesTable).values({
    userId: session.user.id,
    productId: data.productId,
  });

  return { success: true };
};
